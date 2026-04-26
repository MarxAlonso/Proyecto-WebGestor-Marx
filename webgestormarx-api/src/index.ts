console.log('Immediate startup log');
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

console.log('Dotenv loaded. ENV:', process.env.NODE_ENV);

import authRoutes from './routes/authRoutes';
import financeRoutes from './routes/financeRoutes';
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';
import hobbyRoutes from './routes/hobbyRoutes';
import { findPublicBySlug } from './controllers/projectController';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/projects', projectRoutes);
app.get('/api/projects-public/:slug', findPublicBySlug);
app.use('/api/tasks', taskRoutes);
app.use('/api/hobbies', hobbyRoutes);

app.get('/', (req, res) => {
  res.send('GestorMarx API Running');
});

console.log('Starting server...', { NODE_ENV: process.env.NODE_ENV, PORT: port });

// Force listen for debugging
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;
