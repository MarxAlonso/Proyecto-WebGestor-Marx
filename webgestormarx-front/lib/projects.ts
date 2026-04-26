import api from './api';

export type Project = {
  id: string;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status: string;
  docs?: Array<{ title: string; content: string }>;
  isPublic?: boolean;
  shareSlug?: string | null;
};

export async function getProjects() {
  const res = await api.get('/projects');
  return res.data as Project[];
}

export async function createProject(data: { name: string; description?: string; endDate?: string; docs?: Array<{ title: string; content: string }> }) {
  const res = await api.post('/projects', data);
  return res.data as Project;
}

export async function updateProject(
  id: string,
  data: Partial<{
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    status: string;
    docs: Array<{ title: string; content: string }>;
    isPublic: boolean;
  }>
) {
  const res = await api.patch(`/projects/${id}`, data);
  return res.data;
}

export async function deleteProject(id: string) {
  const res = await api.delete(`/projects/${id}`);
  return res.data;
}

export async function shareProject(id: string) {
  const res = await api.post(`/projects/${id}/share`);
  return res.data as { shareSlug: string };
}

export async function getPublicProject(slug: string) {
  const res = await api.get(`/projects-public/${slug}`);
  return res.data as {
    id: string;
    name: string;
    description?: string;
    endDate?: string;
    docs?: Array<{ title: string; content: string }>;
  };
}
