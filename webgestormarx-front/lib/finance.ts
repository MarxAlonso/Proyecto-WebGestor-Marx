import api from "./api";

// ============================================
// Types
// ============================================

export type FinanceSettings = {
    id: string;
    userId: string;
    totalSavings: number;
    createdAt: string;
    updatedAt: string;
};

export type Income = {
    id: string;
    userId: string;
    amount: number;
    source: string;
    isPotential: boolean;
    date: string;
    createdAt: string;
};

export type RecurringPayment = {
    id: string;
    userId: string;
    name: string;
    amount: number;
    paymentDay: number;
    category?: string | null;
    createdAt: string;
};

export type CreateIncomeDto = {
    amount: number;
    source: string;
    isPotential?: boolean;
};

export type UpdateIncomeDto = {
    amount?: number;
    source?: string;
    isPotential?: boolean;
};

export type CreatePaymentDto = {
    name: string;
    amount: number;
    paymentDay: number;
    category?: string;
};

export type UpdatePaymentDto = {
    name?: string;
    amount?: number;
    paymentDay?: number;
    category?: string;
};

export type UpdateSavingsDto = {
    totalSavings: number;
};

// ============================================
// Finance Settings
// ============================================

export const getFinanceSettings = async (): Promise<FinanceSettings> => {
    const res = await api.get<FinanceSettings>("/finance/settings");
    return res.data;
};

export const updateSavings = async (data: UpdateSavingsDto): Promise<FinanceSettings> => {
    const res = await api.patch<FinanceSettings>("/finance/savings", data);
    return res.data;
};

// ============================================
// Income
// ============================================

export const getIncomes = async (): Promise<Income[]> => {
    const res = await api.get<Income[]>("/finance/income");
    return res.data;
};

export const createIncome = async (data: CreateIncomeDto): Promise<Income> => {
    const res = await api.post<Income>("/finance/income", data);
    return res.data;
};

export const updateIncome = async (id: string, data: UpdateIncomeDto): Promise<void> => {
    await api.patch(`/finance/income/${id}`, data);
};

export const deleteIncome = async (id: string): Promise<void> => {
    await api.delete(`/finance/income/${id}`);
};

// ============================================
// Recurring Payments
// ============================================

export const getPayments = async (): Promise<RecurringPayment[]> => {
    const res = await api.get<RecurringPayment[]>("/finance/payments");
    return res.data;
};

export const createPayment = async (data: CreatePaymentDto): Promise<RecurringPayment> => {
    const res = await api.post<RecurringPayment>("/finance/payments", data);
    return res.data;
};

export const updatePayment = async (id: string, data: UpdatePaymentDto): Promise<void> => {
    await api.patch(`/finance/payments/${id}`, data);
};

export const deletePayment = async (id: string): Promise<void> => {
    await api.delete(`/finance/payments/${id}`);
};
