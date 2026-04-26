import api from "./api";

// ============================================
// Types
// ============================================

export type Task = {
    id: string;
    userId: string;
    title: string;
    description?: string | null;
    status?: string | null;
    priority?: string | null;
    estimatedMinutes?: number | null;
    dueDate?: string | null;
    projectId?: string | null;
    typeId?: string | null;
    createdAt: string;
    updatedAt: string;
};

export type CreateTaskDto = {
    title: string;
    description?: string;
    status?: string;
    priority?: string;
    estimatedMinutes?: number;
    dueDate?: string;
    projectId?: string;
    typeId?: string;
};

export type UpdateTaskDto = {
    title?: string;
    description?: string;
    status?: string;
    priority?: string;
    estimatedMinutes?: number;
    dueDate?: string;
    projectId?: string;
    typeId?: string;
};

// ============================================
// CRUD Operations
// ============================================

export const getTasks = async (): Promise<Task[]> => {
    const res = await api.get<Task[]>("/tasks");
    return res.data;
};

export const getTask = async (id: string): Promise<Task> => {
    const res = await api.get<Task>(`/tasks/${id}`);
    return res.data;
};

export const createTask = async (data: CreateTaskDto): Promise<Task> => {
    const res = await api.post<Task>("/tasks", data);
    return res.data;
};

export const updateTask = async (id: string, data: UpdateTaskDto): Promise<Task> => {
    const res = await api.patch<Task>(`/tasks/${id}`, data);
    return res.data;
};

export const deleteTask = async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
};
