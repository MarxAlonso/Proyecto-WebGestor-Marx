import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, CheckSquare, FolderKanban, PiggyBank, Coffee, ArrowRight, Star } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { AnimatedSection } from "@/components/animated-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-32">
          {/* Background Blobs */}
          <div className="absolute top-0 -left-4 w-72 h-72 bg-sky-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-violet-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

          <div className="relative mx-auto max-w-7xl px-6">
            <div className="flex flex-col items-center text-center space-y-8">
              <AnimatedSection delay={100} animation="fade-up">
                <span className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-xs font-medium tracking-wide">
                  <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                  Nueva Plataforma Personal v2.0
                </span>
              </AnimatedSection>
              
              <AnimatedSection delay={300} animation="fade-up">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                  WebGestor Marx
                </h1>
              </AnimatedSection>
              
              <AnimatedSection delay={500} animation="fade-up">
                <p className="max-w-2xl text-muted-foreground text-lg md:text-xl leading-relaxed">
                  Tu ecosistema digital inteligente. Gestiona tareas, proyectos, finanzas y hábitos en una experiencia fluida, premium y diseñada para tu productividad.
                </p>
              </AnimatedSection>
              
              <AnimatedSection delay={700} animation="zoom-in" className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/login">
                  <Button className="h-12 px-8 text-base shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                    Empezar ahora <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="outline" className="h-12 px-8 text-base transition-all hover:bg-muted">
                    Explorar funciones
                  </Button>
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-muted/30 relative">
          <div className="mx-auto max-w-7xl px-6">
            <AnimatedSection delay={200} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Todo lo que necesitas en un solo lugar</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Hemos integrado las herramientas esenciales para tu día a día con una interfaz intuitiva.
              </p>
            </AnimatedSection>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                { 
                  icon: <LayoutDashboard className="h-6 w-6" />, 
                  title: "Panel de Control", 
                  color: "text-sky-500", 
                  bg: "bg-sky-500/10",
                  desc: "Vista holística de tu productividad y estado financiero."
                },
                { 
                  icon: <CheckSquare className="h-6 w-6" />, 
                  title: "Gestión de Tareas", 
                  color: "text-violet-500", 
                  bg: "bg-violet-500/10",
                  desc: "Organiza tu día con listas dinámicas y estados personalizados."
                },
                { 
                  icon: <FolderKanban className="h-6 w-6" />, 
                  title: "Proyectos", 
                  color: "text-pink-500", 
                  bg: "bg-pink-500/10",
                  desc: "Control total sobre tus proyectos complejos y entregas."
                },
                { 
                  icon: <PiggyBank className="h-6 w-6" />, 
                  title: "Finanzas", 
                  color: "text-amber-500", 
                  bg: "bg-amber-500/10",
                  desc: "Monitorea tus ahorros, gastos y suscripciones mensuales."
                }
              ].map((feature, i) => (
                <AnimatedSection key={i} delay={400 + (i * 100)} animation="fade-up">
                  <Card className="border-none shadow-md bg-background/60 backdrop-blur-sm hover:shadow-xl transition-all hover:-translate-y-1 group">
                    <CardHeader>
                      <div className={`p-3 rounded-2xl w-fit mb-2 ${feature.bg} ${feature.color} group-hover:scale-110 transition-transform`}>
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground">
                      {feature.desc}
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>

            {/* Large Card for Habits */}
            <AnimatedSection delay={900} animation="fade-up" className="mt-8">
              <Card className="border-none shadow-md bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-sm overflow-hidden group">
                <div className="flex flex-col md:flex-row items-center p-8 gap-8">
                  <div className="p-4 rounded-3xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 group-hover:rotate-12 transition-transform">
                    <Coffee className="h-10 w-10" />
                  </div>
                  <div className="flex-1 space-y-2 text-center md:text-left">
                    <h3 className="text-2xl font-bold">Rastreador de Hábitos</h3>
                    <p className="text-muted-foreground">
                      Construye rutinas sólidas. Registra tus actividades diarias como el gimnasio, lectura o meditación y visualiza tu progreso semanal.
                    </p>
                  </div>
                  <Button variant="secondary" className="group-hover:translate-x-1 transition-transform">
                    Empezar <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary opacity-[0.03] dark:opacity-[0.07]" />
          <div className="relative mx-auto max-w-4xl px-6">
            <AnimatedSection animation="zoom-in" className="flex flex-col items-center gap-8 text-center bg-background/40 backdrop-blur-xl border p-12 rounded-[3rem] shadow-2xl">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">¿Listo para transformar tu productividad?</h2>
              <p className="max-w-xl text-muted-foreground text-lg">
                Únete a Marx y toma el control total de tu vida digital hoy mismo. Sin complicaciones, solo eficiencia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link href="/login" className="w-full sm:w-auto">
                  <Button size="lg" className="h-14 px-10 text-lg w-full">Comenzar Gratis</Button>
                </Link>
                <Link href="/register" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="h-14 px-10 text-lg w-full">Crear Cuenta</Button>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-muted/20">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">WebGestor Marx</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 WebGestor Marx. Diseñado para el alto rendimiento.
          </p>
          <div className="flex gap-6 text-sm font-medium text-muted-foreground">
            <Link href="#" className="hover:text-primary">Términos</Link>
            <Link href="#" className="hover:text-primary">Privacidad</Link>
            <Link href="#" className="hover:text-primary">Soporte</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
