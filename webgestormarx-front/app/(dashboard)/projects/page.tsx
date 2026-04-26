"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, FolderKanban, Calendar, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Swal from "sweetalert2";
import { createProject, deleteProject, getProjects, updateProject, shareProject, type Project } from "@/lib/projects";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editEndDate, setEditEndDate] = useState("");
  const [docEditors, setDocEditors] = useState<Record<string, { title: string; content: string; editingIndex: number | null }>>({});
  const [viewDocsProjectId, setViewDocsProjectId] = useState<string | null>(null);

  const getEditor = (projectId: string) => {
    return docEditors[projectId] ?? { title: "", content: "", editingIndex: null };
  };
  const updateEditor = (projectId: string, patch: Partial<{ title: string; content: string; editingIndex: number | null }>) => {
    setDocEditors((prev) => {
      const current = prev[projectId] ?? { title: "", content: "", editingIndex: null };
      return { ...prev, [projectId]: { ...current, ...patch } };
    });
  };

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      Swal.fire("Error", "No se pudieron cargar los proyectos.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    try {
      await createProject({
        name,
        description,
        endDate: endDate ? new Date(endDate).toISOString() : undefined,
      });
      setName("");
      setDescription("");
      setEndDate("");
      await fetchProjects();
      Swal.fire("Creado", "Proyecto creado correctamente.", "success");
    } catch {
      Swal.fire("Error", "No se pudo crear el proyecto.", "error");
    }
  };

  const handleDeleteProject = async (id: string) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar proyecto?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });
    if (!confirm.isConfirmed) return;
    try {
      await deleteProject(id);
      await fetchProjects();
      Swal.fire("Eliminado", "Proyecto eliminado correctamente.", "success");
    } catch {
      Swal.fire("Error", "No se pudo eliminar el proyecto.", "error");
    }
  };

  const startEdit = (p: Project) => {
    setEditingId(p.id);
    setEditName(p.name);
    setEditDescription(p.description || "");
    setEditEndDate(p.endDate ? new Date(p.endDate).toISOString().slice(0, 10) : "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditDescription("");
    setEditEndDate("");
  };

  const saveEdit = async (id: string) => {
    try {
      await updateProject(id, {
        name: editName,
        description: editDescription || undefined,
        endDate: editEndDate ? new Date(editEndDate).toISOString() : undefined,
      });
      await fetchProjects();
      cancelEdit();
      Swal.fire("Guardado", "Proyecto actualizado correctamente.", "success");
    } catch {
      Swal.fire("Error", "No se pudo actualizar el proyecto.", "error");
    }
  };

  const addDocumentation = async (p: Project) => {
    const editor = getEditor(p.id);
    if (!editor.title || !editor.content) return;
    const nextDocs = [...(p.docs || []), { title: editor.title, content: editor.content }];
    try {
      await updateProject(p.id, { docs: nextDocs });
      updateEditor(p.id, { title: "", content: "" });
      await fetchProjects();
      Swal.fire("Guardado", "Documentación agregada correctamente.", "success");
    } catch {
      Swal.fire("Error", "No se pudo guardar la documentación.", "error");
    }
  };

  const startEditDoc = (index: number, p: Project) => {
    const d = (p.docs || [])[index];
    updateEditor(p.id, { editingIndex: index, title: d?.title || "", content: d?.content || "" });
  };

  const saveEditDoc = async (p: Project) => {
    const editor = getEditor(p.id);
    if (editor.editingIndex === null) return;
    const docs = [...(p.docs || [])];
    docs[editor.editingIndex] = { title: editor.title, content: editor.content };
    try {
      await updateProject(p.id, { docs });
      updateEditor(p.id, { editingIndex: null, title: "", content: "" });
      await fetchProjects();
      Swal.fire("Guardado", "Documentación actualizada.", "success");
    } catch {
      Swal.fire("Error", "No se pudo actualizar la documentación.", "error");
    }
  };

  const deleteDoc = async (index: number, p: Project) => {
    const res = await Swal.fire({
      title: "¿Eliminar documento?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });
    if (!res.isConfirmed) return;
    const docs = (p.docs || []).filter((_, i) => i !== index);
    try {
      await updateProject(p.id, { docs });
      await fetchProjects();
      Swal.fire("Eliminado", "Documento eliminado.", "success");
    } catch {
      Swal.fire("Error", "No se pudo eliminar el documento.", "error");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Mis Proyectos</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Nuevo Proyecto</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateProject} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Proyecto</Label>
                <Input id="name" placeholder="Ej. Mi Nueva App" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">Fecha de Entrega</Label>
                <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Input id="description" placeholder="Breve descripción..." value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <Button type="submit" className="w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" /> Crear Proyecto
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p>Cargando proyectos...</p>
        ) : projects.length === 0 ? (
          <p className="text-muted-foreground col-span-full text-center py-10">No tienes proyectos activos.</p>
        ) : (
          projects.map((project) => (
            <Card key={project.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-pink-100 rounded-lg">
                    <FolderKanban className="h-6 w-6 text-pink-700" />
                  </div>
                  <div className="flex gap-2">
                    {editingId === project.id ? (
                      <>
                        <Button variant="secondary" size="sm" onClick={() => saveEdit(project.id)}>Guardar</Button>
                        <Button variant="ghost" size="sm" onClick={cancelEdit}>Cancelar</Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" size="sm" onClick={() => startEdit(project)}>Editar</Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteProject(project.id)}>
                          <Trash2 className="h-4 w-4 text-zinc-400" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={async () => {
                            try {
                              const { shareSlug } = await shareProject(project.id);
                              const url = `${window.location.origin}/p/${shareSlug}`;
                              Swal.fire({
                                title: "Enlace público generado",
                                html: `<a href="${url}" target="_blank" rel="noopener noreferrer" class="underline text-sky-600">${url}</a>`,
                                icon: "success",
                                confirmButtonText: "Copiar enlace",
                              }).then((res) => {
                                if (res.isConfirmed) {
                                  navigator.clipboard.writeText(url);
                                }
                              });
                              await fetchProjects();
                            } catch {
                              Swal.fire("Error", "No se pudo generar el enlace público.", "error");
                            }
                          }}
                        >
                          Compartir
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                {editingId === project.id ? (
                  <div className="mt-4 space-y-3">
                    <Input value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Nombre del proyecto" />
                    <Input value={editDescription} onChange={(e) => setEditDescription(e.target.value)} placeholder="Descripción" />
                    <Input type="date" value={editEndDate} onChange={(e) => setEditEndDate(e.target.value)} />
                  </div>
                ) : (
                  <>
                    <CardTitle className="mt-4">{project.name}</CardTitle>
                    {project.description && <p className="text-sm text-muted-foreground truncate">{project.description}</p>}
                  </>
                )}
              </CardHeader>
              <CardContent className="mt-auto">
                <div className="flex items-center text-xs text-zinc-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  {project.endDate ? `Entrega: ${new Date(project.endDate).toLocaleDateString()}` : "Sin fecha de entrega"}
                </div>

                <div className="mt-4 space-y-3">
                  {(project.docs || []).length > 0 && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setViewDocsProjectId(project.id)}
                    >
                      Ver documentación
                    </Button>
                  )}
                  {project.isPublic && project.shareSlug && (
                    <div className="text-xs">
                      <a
                        href={`/p/${project.shareSlug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-sky-600"
                      >
                        Enlace público
                      </a>
                    </div>
                  )}

                  {editingId === project.id && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold">Documentación</h4>
                      {(project.docs || []).length === 0 ? (
                        <p className="text-xs text-muted-foreground">Sin documentación.</p>
                      ) : (
                        <div className="space-y-3">
                          {(project.docs || []).map((doc, idx) => (
                            <div key={idx} className="border rounded-md p-3">
                              <div className="flex items-center justify-between">
                                <div className="font-medium">{doc.title}</div>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm" onClick={() => startEditDoc(idx, project)}>Editar</Button>
                                  <Button variant="ghost" size="sm" onClick={() => deleteDoc(idx, project)}>Eliminar</Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="space-y-2">
                        <Input
                          placeholder="Título del documento"
                          value={getEditor(project.id).title}
                          onChange={(e) => updateEditor(project.id, { title: e.target.value })}
                        />
                        <textarea
                          className="w-full h-32 rounded-md border border-input bg-background text-sm p-2"
                          placeholder="Contenido Markdown"
                          value={getEditor(project.id).content}
                          onChange={(e) => updateEditor(project.id, { content: e.target.value })}
                        />
                        {getEditor(project.id).editingIndex !== null ? (
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => saveEditDoc(project)}>Guardar cambios</Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => updateEditor(project.id, { editingIndex: null, title: "", content: "" })}
                            >
                              Cancelar
                            </Button>
                          </div>
                        ) : (
                          <Button size="sm" onClick={() => addDocumentation(project)}>
                            <Plus className="h-4 w-4 mr-2" /> Agregar Documentación
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {viewDocsProjectId && (
        (() => {
          const project = projects.find((p) => p.id === viewDocsProjectId);
          if (!project) return null;
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-background max-w-3xl w-full mx-4 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Documentación: {project.name}</h3>
                  <Button variant="ghost" size="icon" onClick={() => setViewDocsProjectId(null)}>
                    ✕
                  </Button>
                </div>
                {(project.docs || []).length === 0 ? (
                  <p className="text-sm text-muted-foreground">Sin documentación.</p>
                ) : (
                  (project.docs || []).map((doc, idx) => (
                    <div key={idx} className="mt-4">
                      <h4 className="font-medium mb-2">{doc.title}</h4>
                      <div className="markdown-body text-sm">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeRaw]}
                          components={{
                            a: ({ node, ...props }) => (
                              <a target="_blank" rel="noopener noreferrer" {...props} />
                            ),
                          }}
                        >
                          {doc.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })()
      )}
    </div>
  );
}
