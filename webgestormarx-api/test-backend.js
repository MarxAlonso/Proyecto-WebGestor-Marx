const API_URL = 'http://localhost:3001/api';

async function test() {
  const email = `test${Date.now()}@test.com`;
  const password = 'password123';
  
  try {
    console.log('Registering...');
    const regRes = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name: 'Test User' })
    });
    
    if (!regRes.ok) {
        console.log('Registration failed:', regRes.status, await regRes.text());
        if (regRes.status !== 400) return; // if 400, user might exist, try login
    } else {
        console.log('Registered:', await regRes.json());
    }

    console.log('Logging in...');
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (!loginRes.ok) throw new Error(`Login failed: ${loginRes.status} ${await loginRes.text()}`);
    
    const loginData = await loginRes.json();
    const token = loginData.access_token;
    console.log('Logged in. Token:', token);

    console.log('Fetching projects...');
    const projectsRes = await fetch(`${API_URL}/projects`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (!projectsRes.ok) {
        console.log('Projects failed:', projectsRes.status, await projectsRes.text());
    } else {
        console.log('Projects:', await projectsRes.json());
    }

    // Test Finance Income (Singular)
    console.log('Fetching income...');
    const incomeRes = await fetch(`${API_URL}/finance/income`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (incomeRes.ok) {
      const income = await incomeRes.json();
      console.log('Income:', income);
    } else {
      console.error('Income failed:', incomeRes.status, await incomeRes.text());
    }

    // Test Projects with Docs
    console.log('Creating project with docs...');
    const projRes = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({
        name: 'Test Project with Docs',
        docs: { readme: '# Hello World' }
      })
    });
    
    if (projRes.ok) {
        const proj = await projRes.json();
        console.log('Created Project:', proj);
        
         console.log('Enabling public share...');
         const shareRes = await fetch(`${API_URL}/projects/${proj.id}/share`, {
             method: 'POST',
             headers: { Authorization: `Bearer ${token}` }
         });
         const share = await shareRes.json();
         console.log('Share:', share);
 
         console.log('Fetching public project via /projects/public/:slug ...');
         const pub1 = await fetch(`${API_URL}/projects/public/${share.shareSlug}`);
         console.log('Public 1:', await pub1.json());
 
         console.log('Fetching public project via /projects-public/:slug ...');
         const pub2 = await fetch(`${API_URL}/projects-public/${share.shareSlug}`);
         console.log('Public 2:', await pub2.json());
 
        console.log('Fetching projects to verify docs...');
        const projectsRes = await fetch(`${API_URL}/projects`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const projects = await projectsRes.json();
        console.log('Projects:', JSON.stringify(projects, null, 2));
    } else {
        console.error('Create Project failed:', projRes.status, await projRes.text());
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

test();
