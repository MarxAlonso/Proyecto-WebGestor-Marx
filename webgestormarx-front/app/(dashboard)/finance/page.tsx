"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PiggyBank, TrendingUp, TrendingDown, Plus, Trash2, DollarSign, Edit } from "lucide-react";
import * as financeApi from "@/lib/finance";
import { showSuccess, showError, confirmDelete, showLoading, closeAlert } from "@/lib/sweetalert";

export default function FinancePage() {
    const [settings, setSettings] = useState<financeApi.FinanceSettings | null>(null);
    const [incomes, setIncomes] = useState<financeApi.Income[]>([]);
    const [payments, setPayments] = useState<financeApi.RecurringPayment[]>([]);
    const [loading, setLoading] = useState(true);

    // Form states for Income
    const [incomeAmount, setIncomeAmount] = useState("");
    const [incomeSource, setIncomeSource] = useState("");
    const [isPotential, setIsPotential] = useState(false);

    // Form states for Payment
    const [paymentName, setPaymentName] = useState("");
    const [paymentAmount, setPaymentAmount] = useState("");
    const [paymentDay, setPaymentDay] = useState("");

    // Edit states
    const [editingIncome, setEditingIncome] = useState<string | null>(null);
    const [editingPayment, setEditingPayment] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const [sRes, iRes, pRes] = await Promise.all([
                financeApi.getFinanceSettings(),
                financeApi.getIncomes(),
                financeApi.getPayments(),
            ]);
            setSettings(sRes);
            setIncomes(iRes);
            setPayments(pRes);
        } catch (error) {
            console.error("Error fetching finance data:", error);
            showError("No se pudieron cargar los datos financieros");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddIncome = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!incomeAmount || !incomeSource) return;

        try {
            showLoading("Agregando ingreso...");
            await financeApi.createIncome({
                amount: parseFloat(incomeAmount),
                source: incomeSource,
                isPotential,
            });
            closeAlert();
            showSuccess("Ingreso agregado exitosamente");
            setIncomeAmount("");
            setIncomeSource("");
            setIsPotential(false);
            fetchData();
        } catch (error) {
            closeAlert();
            showError("Error al agregar el ingreso");
        }
    };

    const handleUpdateIncome = async (id: string) => {
        if (!incomeAmount || !incomeSource) return;

        try {
            showLoading("Actualizando ingreso...");
            await financeApi.updateIncome(id, {
                amount: parseFloat(incomeAmount),
                source: incomeSource,
                isPotential,
            });
            closeAlert();
            showSuccess("Ingreso actualizado exitosamente");
            setEditingIncome(null);
            setIncomeAmount("");
            setIncomeSource("");
            setIsPotential(false);
            fetchData();
        } catch (error) {
            closeAlert();
            showError("Error al actualizar el ingreso");
        }
    };

    const handleDeleteIncome = async (id: string, source: string) => {
        const confirmed = await confirmDelete(`el ingreso "${source}"`);
        if (!confirmed) return;

        try {
            showLoading("Eliminando ingreso...");
            await financeApi.deleteIncome(id);
            closeAlert();
            showSuccess("Ingreso eliminado exitosamente");
            fetchData();
        } catch (error) {
            closeAlert();
            showError("Error al eliminar el ingreso");
        }
    };

    const handleAddPayment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!paymentAmount || !paymentName || !paymentDay) return;

        try {
            showLoading("Agregando gasto...");
            await financeApi.createPayment({
                amount: parseFloat(paymentAmount),
                name: paymentName,
                paymentDay: parseInt(paymentDay),
            });
            closeAlert();
            showSuccess("Gasto agregado exitosamente");
            setPaymentAmount("");
            setPaymentName("");
            setPaymentDay("");
            fetchData();
        } catch (error) {
            closeAlert();
            showError("Error al agregar el gasto");
        }
    };

    const handleUpdatePayment = async (id: string) => {
        if (!paymentAmount || !paymentName || !paymentDay) return;

        try {
            showLoading("Actualizando gasto...");
            await financeApi.updatePayment(id, {
                amount: parseFloat(paymentAmount),
                name: paymentName,
                paymentDay: parseInt(paymentDay),
            });
            closeAlert();
            showSuccess("Gasto actualizado exitosamente");
            setEditingPayment(null);
            setPaymentAmount("");
            setPaymentName("");
            setPaymentDay("");
            fetchData();
        } catch (error) {
            closeAlert();
            showError("Error al actualizar el gasto");
        }
    };

    const handleDeletePayment = async (id: string, name: string) => {
        const confirmed = await confirmDelete(`el gasto "${name}"`);
        if (!confirmed) return;

        try {
            showLoading("Eliminando gasto...");
            await financeApi.deletePayment(id);
            closeAlert();
            showSuccess("Gasto eliminado exitosamente");
            fetchData();
        } catch (error) {
            closeAlert();
            showError("Error al eliminar el gasto");
        }
    };

    const startEditIncome = (income: financeApi.Income) => {
        setEditingIncome(income.id);
        setIncomeAmount(income.amount.toString());
        setIncomeSource(income.source);
        setIsPotential(income.isPotential);
    };

    const startEditPayment = (payment: financeApi.RecurringPayment) => {
        setEditingPayment(payment.id);
        setPaymentName(payment.name);
        setPaymentAmount(payment.amount.toString());
        setPaymentDay(payment.paymentDay.toString());
    };

    const totalExpenses = payments.reduce((acc, p) => acc + p.amount, 0);
    const realIncomes = incomes.filter(i => !i.isPotential).reduce((acc, i) => acc + i.amount, 0);
    const potentialIncomes = incomes.filter(i => i.isPotential).reduce((acc, i) => acc + i.amount, 0);

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Finanzas</h2>

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-sky-50 border-sky-100">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-sky-700">Ahorros Totales</CardTitle>
                        <PiggyBank className="h-4 w-4 text-sky-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-sky-900">
                            S/{settings?.totalSavings.toLocaleString() || "0.00"}
                        </div>
                        <p className="text-xs text-sky-600 mt-1">Capital acumulado disponible</p>
                    </CardContent>
                </Card>

                <Card className="bg-emerald-50 border-emerald-100">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-emerald-700">Ingresos Freelance (Potencial)</CardTitle>
                        <TrendingUp className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-900">
                            S/{potentialIncomes.toLocaleString()}
                        </div>
                        <p className="text-xs text-emerald-600 mt-1">Estimación por cobrar</p>
                    </CardContent>
                </Card>

                <Card className="bg-orange-50 border-orange-100">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-orange-700">Gastos Mensuales</CardTitle>
                        <TrendingDown className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-900">
                            S/{totalExpenses.toLocaleString()}
                        </div>
                        <p className="text-xs text-orange-600 mt-1">Total servicios y suscripciones</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Income Form */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">
                            {editingIncome ? "Editar Ingreso" : "Registrar Ingreso"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={editingIncome ? (e) => { e.preventDefault(); handleUpdateIncome(editingIncome); } : handleAddIncome} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="iSource">Fuente</Label>
                                <Input id="iSource" placeholder="Ej. Pago Cliente X, Salario" value={incomeSource} onChange={(e) => setIncomeSource(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="iAmount">Monto (S/)</Label>
                                <Input id="iAmount" type="number" placeholder="0.00" value={incomeAmount} onChange={(e) => setIncomeAmount(e.target.value)} />
                            </div>
                            <div className="flex items-center space-x-2 py-2">
                                <input
                                    type="checkbox"
                                    id="potential"
                                    checked={isPotential}
                                    onChange={(e) => setIsPotential(e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600"
                                />
                                <Label htmlFor="potential" className="text-sm font-medium text-zinc-700">Es ingreso potencial (Freelance)</Label>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                                    <DollarSign className="h-4 w-4 mr-2" /> {editingIncome ? "Actualizar" : "Agregar"} Ingreso
                                </Button>
                                {editingIncome && (
                                    <Button type="button" variant="outline" onClick={() => {
                                        setEditingIncome(null);
                                        setIncomeAmount("");
                                        setIncomeSource("");
                                        setIsPotential(false);
                                    }}>
                                        Cancelar
                                    </Button>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Expenses Form */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">
                            {editingPayment ? "Editar Gasto" : "Nueva Suscripción/Gasto"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={editingPayment ? (e) => { e.preventDefault(); handleUpdatePayment(editingPayment); } : handleAddPayment} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="pName">Servicio</Label>
                                <Input id="pName" placeholder="Ej. Netflix, AWS, Renta" value={paymentName} onChange={(e) => setPaymentName(e.target.value)} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="pAmount">Monto Mensual</Label>
                                    <Input id="pAmount" type="number" placeholder="0.00" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="pDay">Día de Pago</Label>
                                    <Input id="pDay" type="number" min="1" max="31" placeholder="1-31" value={paymentDay} onChange={(e) => setPaymentDay(e.target.value)} />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700">
                                    <Plus className="h-4 w-4 mr-2" /> {editingPayment ? "Actualizar" : "Agregar"} Gasto
                                </Button>
                                {editingPayment && (
                                    <Button type="button" variant="outline" onClick={() => {
                                        setEditingPayment(null);
                                        setPaymentAmount("");
                                        setPaymentName("");
                                        setPaymentDay("");
                                    }}>
                                        Cancelar
                                    </Button>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* Lists */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-semibold">Últimos Ingresos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {incomes.slice(0, 10).map(income => (
                                <div key={income.id} className="flex justify-between items-center p-2 rounded hover:bg-zinc-50 border-b border-zinc-100 last:border-0 text-sm">
                                    <div>
                                        <p className="font-medium">{income.source}</p>
                                        <p className="text-xs text-zinc-500">{new Date(income.date).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={income.isPotential ? "text-amber-600 font-semibold" : "text-emerald-600 font-semibold"}>
                                            {income.isPotential ? "(P) " : ""}+S/{income.amount.toLocaleString()}
                                        </span>
                                        <Button variant="ghost" size="icon" onClick={() => startEditIncome(income)}>
                                            <Edit className="h-3 w-3 text-zinc-400" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteIncome(income.id, income.source)}>
                                            <Trash2 className="h-3 w-3 text-zinc-400" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {incomes.length === 0 && <p className="text-xs text-muted-foreground text-center">No hay ingresos registrados.</p>}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-semibold">Gastos Recurrentes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {payments.map(payment => (
                                <div key={payment.id} className="flex justify-between items-center p-2 rounded hover:bg-zinc-50 border-b border-zinc-100 last:border-0 text-sm">
                                    <div>
                                        <p className="font-medium">{payment.name}</p>
                                        <p className="text-xs text-zinc-500">Cobra el día {payment.paymentDay}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-orange-600 font-semibold">-S/{payment.amount.toLocaleString()}</span>
                                        <Button variant="ghost" size="icon" onClick={() => startEditPayment(payment)}>
                                            <Edit className="h-3 w-3 text-zinc-400" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDeletePayment(payment.id, payment.name)}>
                                            <Trash2 className="h-3 w-3 text-zinc-400" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {payments.length === 0 && <p className="text-xs text-muted-foreground text-center">No hay gastos recurrentes.</p>}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
