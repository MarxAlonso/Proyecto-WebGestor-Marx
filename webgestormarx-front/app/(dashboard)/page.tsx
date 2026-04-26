"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckSquare, FolderKanban, PiggyBank, Coffee } from "lucide-react";
import { getTasks } from "@/lib/tasks";
import { getProjects } from "@/lib/projects";
import { getFinanceSettings } from "@/lib/finance";
import { getHobbies } from "@/lib/hobbies";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    tasks: 0,
    projects: 0,
    savings: 0,
    hobbies: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [t, p, s, h] = await Promise.all([
          getTasks(),
          getProjects(),
          getFinanceSettings(),
          getHobbies(),
        ]);
        setStats({
          tasks: t.length,
          projects: p.length,
          savings: s.totalSavings || 0,
          hobbies: h.length
        });
      } catch (error) {
        console.error("Error fetching dashboard stats", error);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Tareas Pendientes", value: stats.tasks, icon: CheckSquare, color: "text-violet-500", bg: "bg-violet-50" },
    { label: "Proyectos Activos", value: stats.projects, icon: FolderKanban, color: "text-pink-600", bg: "bg-pink-50" },
    { label: "Ahorros Totales", value: `$${stats.savings.toLocaleString()}`, icon: PiggyBank, color: "text-sky-600", bg: "bg-sky-50" },
    { label: "Hábitos/Hobbies", value: stats.hobbies, icon: Coffee, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <p className="text-muted-foreground mt-2">Bienvenido a tu gestor personal WebGestor Marx.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-8">
        {cards.map((card, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{card.label}</CardTitle>
              <div className={`p-2 rounded-md ${card.bg}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
