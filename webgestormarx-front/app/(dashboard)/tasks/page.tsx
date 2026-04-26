"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Edit, CheckCircle } from "lucide-react";
import * as tasksApi from "@/lib/tasks";
import { getProjects } from "@/lib/projects";
import { showSuccess, showError, confirmDelete, showLoading, closeAlert } from "@/lib/sweetalert";

type TaskType = { id: string; name: string };
type Project = { id: string; name: string };

export default function TasksPage() {
  const [tasks, setTasks] = useState<tasksApi.Task[]>([]);
  const [taskTypes, setTaskTypes] = useState<TaskType[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "TODO",
    priority: "",
    estimatedMinutes: "",
    dueDate: "",
    projectId: "",
    typeId: "",
  });

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [tasksRes, projectsRes] = await Promise.all([
        tasksApi.getTasks(),
        getProjects(),
      ]);
      setTasks(tasksRes);
      setProjects(projectsRes);

      // Fetch task types if endpoint exists
      try {
        const typesRes = await fetch(process.env.NEXT_PUBLIC_API_URL + "/task-types", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        if (typesRes.ok) {
          setTaskTypes(await typesRes.json());
        }
      } catch (e) {
        console.log("Task types endpoint not available");
      }
    } catch (e) {
      console.error(e);
      showError("Error al cargar las tareas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      status: "TODO",
      priority: "",
      estimatedMinutes: "",
      dueDate: "",
      projectId: "",
      typeId: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) return;

    const payload: tasksApi.CreateTaskDto = {
      title: form.title,
    };
    if (form.description) payload.description = form.description;
    if (form.status) payload.status = form.status;
    if (form.priority) payload.priority = form.priority;
    if (form.estimatedMinutes) payload.estimatedMinutes = Number(form.estimatedMinutes);
    if (form.dueDate) payload.dueDate = form.dueDate;
    if (form.projectId) payload.projectId = form.projectId;
    if (form.typeId) payload.typeId = form.typeId;

    try {
      showLoading(editingId ? "Actualizando tarea..." : "Creando tarea...");

      if (editingId) {
        await tasksApi.updateTask(editingId, payload);
        closeAlert();
        showSuccess("Tarea actualizada exitosamente");
      } else {
        await tasksApi.createTask(payload);
        closeAlert();
        showSuccess("Tarea creada exitosamente");
      }

      resetForm();
      await fetchAll();
    } catch (e) {
      closeAlert();
      showError(editingId ? "Error al actualizar la tarea" : "Error al crear la tarea");
    }
  };

  const handleEdit = (task: tasksApi.Task) => {
    setEditingId(task.id);
    setForm({
      title: task.title,
      description: task.description || "",
      status: task.status || "TODO",
      priority: task.priority || "",
      estimatedMinutes: task.estimatedMinutes?.toString() || "",
      dueDate: task.dueDate || "",
      projectId: task.projectId || "",
      typeId: task.typeId || "",
    });
  };

  const handleDelete = async (id: string, title: string) => {
    const confirmed = await confirmDelete(`la tarea "${title}"`);
    if (!confirmed) return;

    try {
      showLoading("Eliminando tarea...");
      await tasksApi.deleteTask(id);
      closeAlert();
      showSuccess("Tarea eliminada exitosamente");
      await fetchAll();
    } catch (e) {
      closeAlert();
      showError("Error al eliminar la tarea");
    }
  };

  const handleToggleStatus = async (task: tasksApi.Task) => {
    const newStatus = task.status === "DONE" ? "TODO" : "DONE";
    try {
      await tasksApi.updateTask(task.id, { status: newStatus });
      showSuccess(`Tarea marcada como ${newStatus === "DONE" ? "completada" : "pendiente"}`);
      await fetchAll();
    } catch (e) {
      showError("Error al actualizar el estado");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Tareas</h2>

      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Editar tarea" : "Crear nueva tarea"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Título</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Ej: Implementar login"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Descripción</Label>
              <Input
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Detalles de la tarea"
              />
            </div>
            <div className="space-y-2">
              <Label>Estado</Label>
              <select
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="TODO">Por hacer</option>
                <option value="IN_PROGRESS">En progreso</option>
                <option value="DONE">Completada</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Prioridad</Label>
              <select
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
              >
                <option value="">Sin prioridad</option>
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Minutos estimados</Label>
              <Input
                type="number"
                value={form.estimatedMinutes}
                onChange={(e) => setForm({ ...form, estimatedMinutes: e.target.value })}
                placeholder="Ej: 60"
              />
            </div>
            <div className="space-y-2">
              <Label>Fecha límite</Label>
              <Input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Proyecto</Label>
              <select
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                value={form.projectId}
                onChange={(e) => setForm({ ...form, projectId: e.target.value })}
              >
                <option value="">Sin proyecto</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Tipo de Tarea</Label>
              <select
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                value={form.typeId}
                onChange={(e) => setForm({ ...form, typeId: e.target.value })}
              >
                <option value="">Sin tipo</option>
                {taskTypes.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2 flex gap-2">
              <Button type="submit" className="flex-1">
                {editingId ? "Actualizar" : "Crear"}
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

      <Card>
        <CardHeader>
          <CardTitle>Lista de tareas</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Cargando...</p>
          ) : tasks.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No hay tareas</p>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="border rounded p-3 bg-white hover:bg-zinc-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleToggleStatus(task)}
                        >
                          <CheckCircle
                            className={`h-4 w-4 ${task.status === "DONE" ? "text-emerald-600 fill-emerald-600" : "text-zinc-400"
                              }`}
                          />
                        </Button>
                        <p className={`font-semibold ${task.status === "DONE" ? "line-through text-zinc-500" : ""}`}>
                          {task.title}
                        </p>
                      </div>
                      {task.description && (
                        <p className="text-sm text-gray-600 ml-8 mt-1">{task.description}</p>
                      )}
                      <div className="text-xs mt-2 ml-8 text-gray-500 flex gap-3">
                        <span className="px-2 py-1 bg-zinc-100 rounded">{task.status || "TODO"}</span>
                        {task.priority && (
                          <span className={`px-2 py-1 rounded ${task.priority === "high" ? "bg-red-100 text-red-700" :
                              task.priority === "medium" ? "bg-amber-100 text-amber-700" :
                                "bg-blue-100 text-blue-700"
                            }`}>
                            {task.priority}
                          </span>
                        )}
                        {task.dueDate && <span>📅 {new Date(task.dueDate).toLocaleDateString()}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(task)}>
                        <Edit className="h-4 w-4 text-zinc-400" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(task.id, task.title)}>
                        <Trash2 className="h-4 w-4 text-zinc-400" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
