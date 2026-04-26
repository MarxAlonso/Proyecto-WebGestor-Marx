import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, CheckSquare, FolderKanban, PiggyBank, Coffee } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-white to-violet-100" />
        <div className="relative mx-auto max-w-7xl px-6 py-20">
          <div className="flex flex-col items-center text-center space-y-6">
            <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs tracking-wide">
              Plataforma Personal
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              WebGestor Marx
            </h1>
            <p className="max-w-2xl text-zinc-600 text-lg">
              Autenticación segura, gestor de tareas y proyectos, finanzas personales y hábitos.
            </p>
            <div className="flex gap-3">
              <Link href="/login">
                <Button className="h-11 px-6">Iniciar sesión</Button>
              </Link>
              <Link href="/register">
                <Button variant="secondary" className="h-11 px-6">Crear cuenta</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LayoutDashboard className="h-5 w-5 text-sky-600" />
                Panel
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-zinc-600">
              Resumen de tareas, proyectos y finanzas en una sola vista.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-violet-600" />
                Tareas
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-zinc-600">
              Crea tareas, define tipos personalizados y controla el estado.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderKanban className="h-5 w-5 text-pink-600" />
                Proyectos
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-zinc-600">
              Cronogramas, backlog y relación de tareas por proyecto.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PiggyBank className="h-5 w-5 text-amber-600" />
                Finanzas
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-zinc-600">
              Ahorros totales, ingresos mensuales y pagos recurrentes.
            </CardContent>
          </Card>
          <Card className="md:col-span-2 lg:col-span-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coffee className="h-5 w-5 text-emerald-600" />
                Hábitos
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-zinc-600">
              Registra actividades como lectura o gimnasio y marca cumplimiento.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Comienza ahora</h2>
          <p className="max-w-xl text-zinc-600">
            Accede con tu cuenta y explora el panel con todas tus herramientas.
          </p>
          <div className="flex gap-3">
            <Link href="/login">
              <Button className="h-11 px-6">Entrar</Button>
            </Link>
            <Link href="/register">
              <Button variant="secondary" className="h-11 px-6">Registrarme</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
