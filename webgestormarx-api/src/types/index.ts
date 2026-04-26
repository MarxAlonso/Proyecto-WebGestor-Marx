export interface User {
  id: string;
  email: string;
  password?: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  email: string;
  password: string;
  name?: string;
}

// Finance Types
export interface CreateIncomeDto {
  amount: number;
  source: string;
  isPotential?: boolean;
}

export interface CreatePaymentDto {
  name: string;
  amount: number;
  paymentDay: number;
  category?: string;
}

export interface UpdateSavingsDto {
  totalSavings: number;
}

export interface UpdateIncomeDto {
  amount?: number;
  source?: string;
  isPotential?: boolean;
}

export interface UpdatePaymentDto {
  name?: string;
  amount?: number;
  paymentDay?: number;
  category?: string;
}

// Project Types
export interface CreateProjectDto {
  name: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  status?: string;
  docs?: any;
  docsMarkdown?: string;
  isPublic?: boolean;
}

export type UpdateProjectDto = Partial<CreateProjectDto>;

// Task Types
export interface CreateTaskDto {
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  estimatedMinutes?: number;
  dueDate?: Date;
  projectId?: string;
  typeId?: string;
}

export type UpdateTaskDto = Partial<CreateTaskDto>;

// Task Type Types
export interface CreateTaskTypeDto {
  name: string;
}

export interface UpdateTaskTypeDto {
  name: string;
}

// Hobby Types
export interface CreateHobbyDto {
  name: string;
  category?: string;
  targetDurationMinutes?: number;
}

export interface LogHobbyDto {
  date?: Date;
  durationMinutes?: number;
  completed?: boolean;
  notes?: string;
}

export type UpdateHobbyDto = Partial<CreateHobbyDto>;
