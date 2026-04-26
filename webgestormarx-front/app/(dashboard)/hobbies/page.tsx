"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coffee, Dumbbell, BookOpen, Plus, CheckCircle2, History, MessageSquare, Edit, Trash2 } from "lucide-react";
import * as hobbiesApi from "@/lib/hobbies";
import { showSuccess, showError, confirmDelete, showLoading, closeAlert } from "@/lib/sweetalert";

export default function HobbiesPage() {
    const [hobbies, setHobbies] = useState<hobbiesApi.Hobby[]>([]);
    const [loading, setLoading] = useState(true);

    // Create/Edit Hobby Form
    const [editingId, setEditingId] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("Deporte");
    const [targetTime, setTargetTime] = useState("");

    // Log Activity State
    const [loggingHobbyId, setLoggingHobbyId] = useState<string | null>(null);
    const [duration, setDuration] = useState("");
    const [notes, setNotes] = useState("");

    const fetchHobbies = async () => {
        try {
            const response = await hobbiesApi.getHobbies();
            setHobbies(response);
        } catch (error) {
            console.error("Error fetching hobbies:", error);
            showError("Error al cargar los pasatiempos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHobbies();
    }, []);

    const resetForm = () => {
        setName("");
        setCategory("Deporte");
        setTargetTime("");
        setEditingId(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name) return;

        const payload: hobbiesApi.CreateHobbyDto = {
            name,
            category,
            targetDurationMinutes: targetTime ? parseInt(targetTime) : undefined,
        };

        try {
            showLoading(editingId ? "Actualizando pasatiempo..." : "Creando pasatiempo...");

            if (editingId) {
                await hobbiesApi.updateHobby(editingId, payload);
                closeAlert();
                showSuccess("Pasatiempo actualizado exitosamente");
            } else {
                await hobbiesApi.createHobby(payload);
                closeAlert();
                showSuccess("Pasatiempo creado exitosamente");
            }

            resetForm();
            fetchHobbies();
        } catch (error) {
            closeAlert();
            showError(editingId ? "Error al actualizar el pasatiempo" : "Error al crear el pasatiempo");
        }
    };

    const handleEdit = (hobby: hobbiesApi.Hobby) => {
        setEditingId(hobby.id);
        setName(hobby.name);
        setCategory(hobby.category || "Deporte");
        setTargetTime(hobby.targetDurationMinutes?.toString() || "");
    };

    const handleDelete = async (id: string, name: string) => {
        const confirmed = await confirmDelete(`el pasatiempo "${name}"`);
        if (!confirmed) return;

        try {
            showLoading("Eliminando pasatiempo...");
            await hobbiesApi.deleteHobby(id);
            closeAlert();
            showSuccess("Pasatiempo eliminado exitosamente");
            fetchHobbies();
        } catch (error) {
            closeAlert();
            showError("Error al eliminar el pasatiempo");
        }
    };

    const handleLogActivity = async (hobbyId: string) => {
        try {
            showLoading("Registrando actividad...");
            await hobbiesApi.logHobbyActivity(hobbyId, {
                durationMinutes: duration ? parseInt(duration) : 0,
                notes,
                completed: true,
            });
            closeAlert();
            showSuccess("Actividad registrada exitosamente");
            setLoggingHobbyId(null);
            setDuration("");
            setNotes("");
            fetchHobbies();
        } catch (error) {
            closeAlert();
            showError("Error al registrar la actividad");
        }
    };

    const getHobbyIcon = (name: string) => {
        const n = name.toLowerCase();
        if (n.includes("gym") || n.includes("gimnasio") || n.includes("ejercicio")) return <Dumbbell className="h-6 w-6" />;
        if (n.includes("leer") || n.includes("libro")) return <BookOpen className="h-6 w-6" />;
        return <Coffee className="h-6 w-6" />;
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Pasatiempos y Hábitos</h2>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">
                        {editingId ? "Editar Pasatiempo / Hábito" : "Nuevo Pasatiempo / Hábito"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="space-y-2">
                            <Label htmlFor="hName">Nombre</Label>
                            <Input id="hName" placeholder="Ej. Gimnasio, Leer" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="hCat">Categoría</Label>
                            <select
                                id="hCat"
                                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="Deporte">Deporte</option>
                                <option value="Salud">Salud</option>
                                <option value="Aprendizaje">Aprendizaje</option>
                                <option value="Ocio">Ocio</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="hTime">Meta (Minutos)</Label>
                            <Input id="hTime" type="number" placeholder="Ej. 60" value={targetTime} onChange={(e) => setTargetTime(e.target.value)} />
                        </div>
                        <div className="flex gap-2">
                            <Button type="submit" className="flex-1">
                                <Plus className="h-4 w-4 mr-2" /> {editingId ? "Actualizar" : "Crear"}
                            </Button>
                            {editingId && (
                                <Button type="button" variant="outline" onClick={resetForm}>
                                    Cancelar
                                </Button>
                            )}
                        </div>
                    </form>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                {loading ? (
                    <p>Cargando...</p>
                ) : hobbies.length === 0 ? (
                    <p className="text-muted-foreground col-span-full text-center py-10">
                        No tienes hábitos registrados aún.
                    </p>
                ) : (
                    hobbies.map((hobby) => (
                        <Card key={hobby.id} className="relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                {getHobbyIcon(hobby.name)}
                            </div>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
                                            {getHobbyIcon(hobby.name)}
                                        </div>
                                        <div>
                                            <CardTitle>{hobby.name}</CardTitle>
                                            <p className="text-xs text-zinc-500 uppercase font-semibold">{hobby.category}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        <Button variant="ghost" size="icon" onClick={() => handleEdit(hobby)}>
                                            <Edit className="h-4 w-4 text-zinc-400" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(hobby.id, hobby.name)}>
                                            <Trash2 className="h-4 w-4 text-zinc-400" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-zinc-500">Última actividad:</span>
                                    <span className="font-medium">
                                        {hobby.logs && hobby.logs[0] ? new Date(hobby.logs[0].date).toLocaleDateString() : "Nunca"}
                                    </span>
                                </div>

                                {loggingHobbyId === hobby.id ? (
                                    <div className="bg-zinc-50 p-3 rounded-lg space-y-3">
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                            <Input
                                                placeholder="Minutos"
                                                type="number"
                                                className="h-8"
                                                value={duration}
                                                onChange={(e) => setDuration(e.target.value)}
                                            />
                                            <Input
                                                placeholder="Notas (ej. Pecho/Triceps)"
                                                className="h-8"
                                                value={notes}
                                                onChange={(e) => setNotes(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="sm" className="flex-1 h-8" onClick={() => handleLogActivity(hobby.id)}>Confirmar</Button>
                                            <Button size="sm" variant="ghost" className="h-8" onClick={() => setLoggingHobbyId(null)}>Cancelar</Button>
                                        </div>
                                    </div>
                                ) : (
                                    <Button variant="outline" className="w-full border-dashed" onClick={() => setLoggingHobbyId(hobby.id)}>
                                        <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-500" /> Marcar como Cumplido
                                    </Button>
                                )}

                                <div className="space-y-2 border-t pt-4">
                                    <h5 className="text-xs font-bold text-zinc-400 flex items-center">
                                        <History className="h-3 w-3 mr-1" /> HISTORIAL RECIENTE
                                    </h5>
                                    {hobby.logs && hobby.logs.map(log => (
                                        <div key={log.id} className="flex justify-between items-center text-xs p-1">
                                            <span className="text-zinc-500">{new Date(log.date).toLocaleDateString()}</span>
                                            <div className="flex items-center gap-2">
                                                {log.notes && (
                                                    <span title={log.notes}>
                                                        <MessageSquare className="h-3 w-3 text-sky-400" />
                                                    </span>
                                                )}
                                                <span className="font-medium">{log.durationMinutes} min</span>
                                                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                                            </div>
                                        </div>
                                    ))}
                                    {(!hobby.logs || hobby.logs.length === 0) && <p className="text-xs text-zinc-400 italic">No hay registros.</p>}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
