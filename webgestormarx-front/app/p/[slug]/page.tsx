"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPublicProject } from "@/lib/projects";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CalendarDays, FileText, FolderOpen, Loader2 } from "lucide-react";

export default function PublicProjectPage() {
  const params = useParams();
  const slugParam = params?.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : (slugParam as string);
  const [data, setData] = useState<{
    id: string;
    name: string;
    description?: string;
    endDate?: string;
    docs?: Array<{ title: string; content: string }>;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [openDocIndex, setOpenDocIndex] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        if (!slug) return;
        const res = await getPublicProject(slug);
        const normalizeDocs = (docs: any) => {
          if (!docs) return [];
          if (Array.isArray(docs)) return docs;
          if (typeof docs === "object") {
            return Object.entries(docs).map(([title, content]) => ({
              title,
              content: String(content ?? ""),
            }));
          }
          return [];
        };
        setData({
          ...res,
          docs: normalizeDocs(res?.docs),
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-zinc-50">
        <div className="flex items-center gap-2 text-zinc-600">
          <Loader2 className="size-5 animate-spin" />
          <span className="text-sm">Cargando proyecto...</span>
        </div>
      </div>
    );
  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-zinc-50">
        <div className="text-center space-y-2">
          <FolderOpen className="size-10 mx-auto text-zinc-400" />
          <div className="text-lg font-medium">Proyecto no disponible</div>
          <div className="text-sm text-zinc-600">Verifica el enlace compartido.</div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-zinc-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="rounded-2xl bg-gradient-to-r from-indigo-500/10 via-sky-500/10 to-purple-500/10 p-6 sm:p-8 border border-zinc-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">{data.name}</h1>
              {data.description && (
                <p className="text-zinc-700 text-sm sm:text-base">{data.description}</p>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-700">
              <CalendarDays className="size-4" />
              <span>
                {data.endDate
                  ? `Entrega: ${new Date(data.endDate).toLocaleDateString()}`
                  : "Sin fecha de entrega"}
              </span>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="size-5 text-zinc-700" />
              <span>Documentación</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(data.docs || []).length === 0 ? (
              <div className="flex items-center gap-2 text-sm text-zinc-600">
                <FolderOpen className="size-4" />
                <span>Sin documentación.</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(data.docs || []).map((doc, idx) => {
                  const preview = (doc.content || "").slice(0, 120);
                  return (
                    <button
                      key={idx}
                      onClick={() => setOpenDocIndex(idx)}
                      className="group flex flex-col rounded-xl border border-zinc-200 bg-white hover:bg-indigo-50/30 transition-colors p-4 text-left shadow-sm hover:shadow-md hover:border-indigo-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                    >
                      <div className="flex items-center gap-2">
                        <div className="rounded-md bg-indigo-100 text-indigo-700 p-2">
                          <FileText className="size-4" />
                        </div>
                        <div className="font-medium text-zinc-900">{doc.title}</div>
                      </div>
                      <div className="mt-2 text-sm text-zinc-600 line-clamp-3">{preview}</div>
                    </button>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {openDocIndex !== null && data?.docs && data.docs[openDocIndex] && (
        <Sheet open={openDocIndex !== null} onOpenChange={(open) => !open && setOpenDocIndex(null)}>
          <SheetContent side="right" className="w-full sm:max-w-3xl">
            <SheetHeader>
              <SheetTitle>{data.docs[openDocIndex].title}</SheetTitle>
            </SheetHeader>
            <div className="markdown-body p-4 h-[calc(100vh-12rem)] overflow-y-auto">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  a: ({ node, ...props }) => (
                    <a target="_blank" rel="noopener noreferrer" {...props} />
                  ),
                }}
              >
                {data.docs[openDocIndex].content}
              </ReactMarkdown>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
