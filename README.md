# WebGestor Marx

Sistema de gestión personal integral que incluye gestión de tareas, proyectos, finanzas personales y pasatiempos.

## Estructura del Proyecto

El proyecto está dividido en dos partes principales:

- **client/**: Frontend construido con Next.js y Tailwind CSS.
- **server/**: Backend construido con NestJS y PostgreSQL (Prisma).

## Requisitos

- Node.js (v18 o superior)
- npm
- PostgreSQL (Neon Database)

## Configuración

### Backend (Server)

1.  Navega a la carpeta `server`.
2.  Instala las dependencias (si no se instalaron automáticamente):
    ```bash
    npm install
    ```
3.  Configura las variables de entorno:
    - Crea un archivo `.env` basado en `.env.example` (si existe) o añade `DATABASE_URL`.
4.  Inicia el servidor de desarrollo:
    ```bash
    npm run start:dev
    ```

### Frontend (Client)

1.  Navega a la carpeta `client`.
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```

## Stack Tecnológico

- **Frontend:** Next.js, React, Tailwind CSS, TypeScript.
- **Backend:** NestJS, TypeScript, Prisma ORM.
- **Base de Datos:** PostgreSQL (Neon).
# Proyecto-WebGestor-Marx
