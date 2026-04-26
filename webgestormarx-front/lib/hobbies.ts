import api from "./api";

// ============================================
// Types
// ============================================

export type HobbyLog = {
    id: string;
    hobbyId: string;
    date: string;
    durationMinutes: number;
    completed: boolean;
    notes?: string | null;
    createdAt: string;
};

export type Hobby = {
    id: string;
    userId: string;
    name: string;
    targetDurationMinutes?: number | null;
    category?: string | null;
    createdAt: string;
    updatedAt: string;
    logs?: HobbyLog[];
};

export type CreateHobbyDto = {
    name: string;
    targetDurationMinutes?: number;
    category?: string;
};

export type UpdateHobbyDto = {
    name?: string;
    targetDurationMinutes?: number;
    category?: string;
};

export type LogHobbyDto = {
    date?: string;
    durationMinutes: number;
    completed?: boolean;
    notes?: string;
};

// ============================================
// CRUD Operations
// ============================================

export const getHobbies = async (): Promise<Hobby[]> => {
    const res = await api.get<Hobby[]>("/hobbies");
    return res.data;
};

export const getHobby = async (id: string): Promise<Hobby> => {
    const res = await api.get<Hobby>(`/hobbies/${id}`);
    return res.data;
};

export const createHobby = async (data: CreateHobbyDto): Promise<Hobby> => {
    const res = await api.post<Hobby>("/hobbies", data);
    return res.data;
};

export const updateHobby = async (id: string, data: UpdateHobbyDto): Promise<void> => {
    await api.patch(`/hobbies/${id}`, data);
};

export const deleteHobby = async (id: string): Promise<void> => {
    await api.delete(`/hobbies/${id}`);
};

export const logHobbyActivity = async (id: string, data: LogHobbyDto): Promise<HobbyLog> => {
    const res = await api.post<HobbyLog>(`/hobbies/${id}/log`, data);
    return res.data;
};
