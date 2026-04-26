# 🎫 Sistema de Gestión de Tickets - Famat Support

[![Node.js](https://img.shields.io/badge/Node.js-22.x-green?logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1-61dafb?logo=react)](https://reactjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.1-2D3748?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql)](https://www.postgresql.org/)
[![Express](https://img.shields.io/badge/Express-5.1-000000?logo=express)](https://expressjs.com/)

Sistema fullstack de gestión de tickets y proyectos con control de acceso basado en roles (RBAC), autenticación JWT, y gestión de evidencias con AWS S3.

---

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Repositorio del Código](#-repositorio-del-código)
- [Características Principales](#-características-principales)
- [Arquitectura del Sistema](#-arquitectura-del-sistema)
- [Requisitos del Sistema](#-requisitos-del-sistema)
- [Instalación](#-instalación)
- [Variables de Entorno](#-variables-de-entorno)
- [Cómo Correr en Local](#-cómo-correr-en-local)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Guía de Usuario](#-guía-de-usuario)
- [API Endpoints](#-api-endpoints)
- [Base de Datos](#-base-de-datos)
- [Scripts Disponibles](#-scripts-disponibles)

---

## 📖 Descripción del Proyecto

**Famat Support** es una plataforma completa de gestión de tickets diseñada para facilitar la administración de proyectos, seguimiento de incidencias, y colaboración entre equipos. El sistema implementa un control de acceso robusto con diferentes roles de usuario (Administrador, Cliente, Desarrollador, Product Owner, Agente Operativo) y permite la gestión completa del ciclo de vida de los tickets.

### Funcionalidades Clave

- 🎯 **Gestión de Tickets**: Creación, asignación, seguimiento y resolución de tickets
- 👥 **Multi-Rol**: Sistema de roles con permisos granulares (RBAC)
- 🔐 **Autenticación Segura**: JWT con refresh tokens y encriptación bcrypt
- 📁 **Gestión de Proyectos**: Organización de tickets por proyectos y clientes
- 💬 **Sistema de Comentarios**: Comunicación en tiempo real sobre tickets
- 📎 **Evidencias**: Carga de archivos (imágenes/PDFs) con AWS S3
- 📊 **Dashboard**: Visualización de métricas y estadísticas con gráficos
- 📜 **Historial**: Registro completo de cambios en tickets
- ⏱️ **SLA**: Control de tiempos de respuesta por categoría

---

## 🗂️ Repositorio del Código

```
https://github.com/JosephRamirez-F4fu/famat-support
```

### Estructura del Repositorio

```
famat-support/
├── backend-api/          # API REST con TypeScript + Express + Prisma
├── jira/                 # Frontend React + Vite + TailwindCSS
├── docker-compose.yml    # Configuración de Docker para PostgreSQL
└── README.md            # Este archivo
```

---

## ✨ Características Principales

### Backend (API REST)

- ✅ **Arquitectura en Capas**: Controller → Service → Repository → Database
- ✅ **TypeScript**: Tipado estático para mayor seguridad
- ✅ **Prisma ORM**: Gestión de base de datos con migraciones automáticas
- ✅ **Autenticación JWT**: Access tokens y refresh tokens
- ✅ **Middleware de Autorización**: Control de acceso basado en roles
- ✅ **Validación de Datos**: express-validator en todas las rutas
- ✅ **Logging**: Winston para logs estructurados + Morgan para HTTP
- ✅ **AWS S3**: Almacenamiento de evidencias con URLs pre-firmadas
- ✅ **CORS**: Configurado para desarrollo y producción
- ✅ **Swagger**: Documentación automática de API

### Frontend (React SPA)

- ✅ **React 19**: Última versión con mejoras de rendimiento
- ✅ **Vite**: Build tool ultrarrápido con HMR
- ✅ **TailwindCSS 4**: Diseño responsive y moderno
- ✅ **React Router v7**: Navegación con rutas protegidas
- ✅ **Recharts**: Gráficos y visualizaciones de datos
- ✅ **Radix UI**: Componentes accesibles y personalizables
- ✅ **React Icons**: Librería completa de iconos
- ✅ **React Hot Toast**: Notificaciones elegantes
- ✅ **Módulos por Rol**: Interfaces específicas por tipo de usuario

---

## 🏗️ Arquitectura del Sistema

### Arquitectura General

El sistema sigue una arquitectura de **3 capas** con separación clara de responsabilidades:

```mermaid
graph TB
    A[Cliente Web Browser] -->|HTTP/HTTPS| B[Frontend React]
    B -->|API REST| C[Backend Express]
    C -->|Prisma ORM| D[PostgreSQL Database]
    C -->|AWS SDK| E[AWS S3 Storage]
    
    style A fill:#e1f5ff
    style B fill:#b3e5fc
    style C fill:#81d4fa
    style D fill:#4fc3f7
    style E fill:#29b6f6
```

### Arquitectura del Backend

![backend_architecture_1769542935279](https://github.com/user-attachments/assets/ffebd984-18e3-4540-a346-a55e8f4b1f13)


**Capas del Backend:**

1. **API Routes Layer**: Define los endpoints REST
2. **Controllers Layer**: Maneja las peticiones HTTP y respuestas
3. **Services Layer**: Contiene la lógica de negocio
4. **Repository Layer**: Abstracción de acceso a datos
5. **Database Layer**: PostgreSQL con Prisma ORM

**Middleware:**
- Authentication (JWT)
- Authorization (RBAC)
- Validation (express-validator)
- Error Handler (centralizado)

### Arquitectura del Frontend

**Módulos del Frontend:**![frontend_architecture_1769542961750](https://github.com/user-attachments/assets/272aa606-2b6c-443a-b0e6-92c01cf3c9d1)


1. **Features**: Módulos por rol (Admin, Cliente, Desarrollador, PO, Operativo)
2. **Components**: Componentes UI reutilizables
3. **Services**: Comunicación con la API
4. **Models**: Interfaces TypeScript
5. **Styles**: Estilos CSS modulares

---

## 💻 Requisitos del Sistema

### Software Necesario

| Software | Versión Mínima | Recomendada | Descarga |
|----------|----------------|-------------|----------|
| **Node.js** | 18.x | 22.x | [nodejs.org](https://nodejs.org/) |
| **npm** | 9.x | 10.x | Incluido con Node.js |
| **PostgreSQL** | 14.x | 16.x | [postgresql.org](https://www.postgresql.org/) |
| **Git** | 2.0+ | Última | [git-scm.com](https://git-scm.com/) |
| **Docker** (Opcional) | 20.x | Última | [docker.com](https://www.docker.com/) |

### Cuenta AWS (Opcional)

Para la funcionalidad de carga de evidencias, necesitas:
- Cuenta de AWS activa
- Bucket S3 configurado
- Credenciales IAM con permisos S3

### Verificar Instalaciones

```bash
# Verificar Node.js
node --version
# Debe mostrar: v18.x o superior

# Verificar npm
npm --version
# Debe mostrar: 9.x o superior

# Verificar PostgreSQL
psql --version
# Debe mostrar: psql (PostgreSQL) 14.x o superior

# Verificar Git
git --version
# Debe mostrar: git version 2.x o superior
```

---

## 📦 Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/JosephRamirez-F4fu/famat-support.git
cd famat-support
```

### 2. Instalar Dependencias del Backend

```bash
cd backend-api
npm install
```

**Dependencias principales instaladas:**
- `express` - Framework web
- `@prisma/client` - ORM para base de datos
- `jsonwebtoken` - Autenticación JWT
- `bcryptjs` - Encriptación de contraseñas
- `@aws-sdk/client-s3` - Cliente AWS S3
- `express-validator` - Validación de datos
- `winston` - Sistema de logging
- `cors` - Configuración CORS

### 3. Instalar Dependencias del Frontend

```bash
cd ../jira
npm install
```

**Dependencias principales instaladas:**
- `react` & `react-dom` - Librería UI
- `react-router-dom` - Enrutamiento
- `recharts` - Gráficos y visualizaciones
- `@radix-ui/react-slot` - Componentes UI
- `lucide-react` - Iconos
- `react-hot-toast` - Notificaciones

### 4. Configurar Base de Datos

#### Opción A: Usar Docker (Recomendado)

```bash
# Desde la raíz del proyecto
docker compose up -d
```

Esto creará un contenedor PostgreSQL con:
- Puerto: `5432`
- Usuario: `admin`
- Contraseña: `admin`
- Base de datos: `sistema_aeropuerto_db`

#### Opción B: PostgreSQL Local

Si tienes PostgreSQL instalado localmente:

```bash
# Conectar a PostgreSQL
psql -U postgres

# Crear base de datos
CREATE DATABASE sistema_aeropuerto_db;

# Crear usuario (opcional)
CREATE USER admin WITH PASSWORD 'admin';
GRANT ALL PRIVILEGES ON DATABASE sistema_aeropuerto_db TO admin;
```

---

## ⚙️ Variables de Entorno

### Backend (.env)

Crea un archivo `.env` en la carpeta `backend-api/`:

```bash
cd backend-api
cp .env.example .env
```

Edita el archivo `.env` con tus configuraciones:

```env
# ===================================
# DATABASE CONFIGURATION
# ===================================
DATABASE_URL="postgresql://admin:admin@localhost:5432/sistema_aeropuerto_db?schema=public"

# ===================================
# JWT SECRETS
# ===================================
# IMPORTANTE: Genera claves seguras únicas para producción
# Puedes usar: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET="tu_clave_secreta_jwt_muy_segura_256bits_minimo"
REFRESH_SECRET="tu_clave_secreta_refresh_token_diferente_y_segura"

# ===================================
# FRONTEND URL (CORS)
# ===================================
FRONTEND_URL="http://localhost:5173"

# ===================================
# AWS S3 CONFIGURATION (Opcional)
# ===================================
AWS_ACCESS_KEY_ID="tu_access_key_id"
AWS_SECRET_ACCESS_KEY="tu_secret_access_key"
AWS_REGION="sa-east-1"
AWS_BUCKET_NAME="nombre-de-tu-bucket"
```

#### Generar Claves Seguras

```bash
# En Node.js, ejecuta:
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Frontend (.env)

Crea un archivo `.env` en la carpeta `jira/`:

```bash
cd jira
cp .env.example .env
```

Edita el archivo `.env`:

```env
# ===================================
# API BACKEND URL
# ===================================
VITE_API_BASE_URL=http://localhost:3000/api
```

> **Nota**: En producción, cambia esta URL a tu dominio de backend.

---

## 🚀 Cómo Correr en Local

### Paso 1: Ejecutar Migraciones de Base de Datos

```bash
cd backend-api

# Ejecutar migraciones de Prisma
npx prisma migrate dev

# Generar cliente de Prisma
npx prisma generate

# Poblar base de datos con datos iniciales (seeds)
npx prisma db seed
```

**Datos de prueba creados:**
- Roles: Administrador, Cliente, Desarrollador, Product Owner, Agente Operativo
- Usuarios de prueba para cada rol
- Estados: Abierto, En Progreso, Resuelto, Cerrado
- Categorías con SLA configurado
- Permisos y asignaciones

### Paso 2: Iniciar el Backend

Abre una terminal y ejecuta:

```bash
cd backend-api
npm run dev
```

**Salida esperada:**
```
[INFO] Servidor corriendo en http://localhost:3000
[INFO] Prisma conectado a PostgreSQL
[INFO] Swagger docs disponibles en http://localhost:3000/docs
```

El backend estará disponible en: **http://localhost:3000**

### Paso 3: Iniciar el Frontend

Abre **otra terminal** y ejecuta:

```bash
cd jira
npm run dev
```

**Salida esperada:**
```
  VITE v7.1.7  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

El frontend estará disponible en: **http://localhost:5173**

### Paso 4: Acceder al Sistema

Abre tu navegador en `http://localhost:5173`

**Usuarios de prueba:**

| Rol | Email | Contraseña |
|-----|-------|------------|
| Administrador | admin@famat.com | admin123 |
| Cliente | cliente@empresa.com | cliente123 |
| Desarrollador | dev@famat.com | dev123 |
| Product Owner | po@famat.com | po123 |
| Agente Operativo | operativo@famat.com | operativo123 |

---

## 📁 Estructura del Proyecto

### Backend (backend-api/)

```
backend-api/
├── src/
│   ├── config/
│   │   └── logger.ts              # Configuración de Winston
│   ├── controllers/               # Controladores HTTP
│   │   ├── auth.controller.ts     # Login, logout, refresh
│   │   ├── usuario.controller.ts  # CRUD usuarios
│   │   ├── ticket.controller.ts   # CRUD tickets
│   │   ├── proyecto.controller.ts # CRUD proyectos
│   │   ├── categoria.controller.ts
│   │   ├── estado.controller.ts
│   │   ├── comentarios.controller.ts
│   │   ├── evidencia.controller.ts
│   │   ├── historialtickets.controller.ts
│   │   ├── liberacion.controller.ts
│   │   └── rol.controller.ts
│   ├── services/                  # Lógica de negocio
│   │   ├── auth.service.ts
│   │   ├── usuario.service.ts
│   │   ├── ticket.service.ts
│   │   ├── proyecto.service.ts
│   │   └── ... (otros servicios)
│   ├── repositories/              # Acceso a datos
│   │   ├── usuario.repository.ts
│   │   ├── ticket.repository.ts
│   │   ├── proyecto.repository.ts
│   │   └── ... (otros repositorios)
│   ├── models/                    # Interfaces TypeScript
│   │   ├── usuario.model.ts
│   │   ├── ticket.model.ts
│   │   └── ... (otros modelos)
│   ├── routes/                    # Definición de rutas
│   │   ├── auth.routes.ts
│   │   ├── usuario.routes.ts
│   │   ├── ticket.routes.ts
│   │   └── ... (otras rutas)
│   ├── middleware/                # Middleware personalizado
│   │   ├── auth.middleware.ts     # Verificación JWT
│   │   ├── authorize.middleware.ts # Control de permisos
│   │   ├── error.middleware.ts    # Manejo de errores
│   │   └── upload.middleware.ts   # Multer para archivos
│   ├── errors/
│   │   └── custom.error.ts        # Errores personalizados
│   ├── lib/
│   │   └── prisma.ts              # Cliente Prisma
│   └── index.ts                   # Punto de entrada
├── prisma/
│   ├── schema.prisma              # Esquema de base de datos
│   ├── migrations/                # Migraciones SQL
│   └── seeds/
│       └── seed.ts                # Datos iniciales
├── .env                           # Variables de entorno
├── .env.example                   # Ejemplo de variables
├── package.json
├── tsconfig.json
└── README.md
```

### Frontend (jira/)

```
jira/
├── src/
│   ├── features/                  # Módulos por rol
│   │   ├── admin/                 # Panel de administrador
│   │   │   ├── pages/
│   │   │   │   └── AdminHome.tsx
│   │   │   └── components/
│   │   │       ├── UserManagement.tsx
│   │   │       ├── RoleManagement.tsx
│   │   │       └── ProjectManagement.tsx
│   │   ├── cliente/               # Panel de cliente
│   │   │   ├── layouts/
│   │   │   │   └── ClientLayout.tsx
│   │   │   ├── pages/
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── CreateTicketPage.tsx
│   │   │   │   ├── TicketDetailPage.tsx
│   │   │   │   └── ProfilePage.tsx
│   │   │   └── components/
│   │   ├── desarrollador/         # Panel de desarrollador
│   │   │   ├── layouts/
│   │   │   ├── pages/
│   │   │   └── components/
│   │   ├── productowner/          # Panel de Product Owner
│   │   │   ├── layouts/
│   │   │   ├── pages/
│   │   │   └── components/
│   │   ├── operativo/             # Panel de agente operativo
│   │   │   └── pages/
│   │   ├── auth/                  # Autenticación
│   │   │   ├── pages/
│   │   │   │   └── LoginPage.tsx
│   │   │   └── components/
│   │   └── tickets/               # Componentes compartidos de tickets
│   ├── components/                # Componentes UI globales
│   │   ├── Navbar.tsx
│   │   ├── Modal.tsx
│   │   ├── ConfirmDialog.tsx
│   │   └── ProtectedRoute.tsx
│   ├── services/                  # Comunicación con API
│   │   ├── apiClient.ts           # Cliente HTTP (fetch)
│   │   └── apiRoutes.ts           # Definición de endpoints
│   ├── models/                    # Interfaces TypeScript
│   │   ├── usuario.model.ts
│   │   ├── ticket.model.ts
│   │   ├── proyecto.model.ts
│   │   └── ... (otros modelos)
│   ├── styles/                    # Estilos CSS
│   │   ├── AdminHome.css
│   │   ├── Login.css
│   │   ├── Navbar.css
│   │   └── ... (otros estilos)
│   ├── App.tsx                    # Componente raíz
│   ├── main.tsx                   # Punto de entrada
│   └── index.css                  # Estilos globales
├── public/
│   └── famat_support.jpeg         # Logo
├── .env                           # Variables de entorno
├── .env.example
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

---

## 👥 Guía de Usuario

### Roles del Sistema

El sistema cuenta con **5 roles principales**, cada uno con permisos y funcionalidades específicas:

#### 1. 👨‍💼 Administrador

**Permisos:**
- Gestión completa de usuarios (crear, editar, eliminar, activar/desactivar)
- Gestión de roles y permisos
- Gestión de proyectos y asignación de clientes
- Configuración de categorías y estados
- Visualización de todos los tickets del sistema
- Acceso a reportes y estadísticas globales

**Pantallas principales:**
- Dashboard administrativo con métricas
- Gestión de usuarios
- Gestión de proyectos
- Gestión de roles y permisos
- Configuración del sistema

#### 2. 👤 Cliente

**Permisos:**
- Crear tickets para sus proyectos
- Ver sus propios tickets
- Agregar comentarios a sus tickets
- Subir evidencias (imágenes/PDFs)
- Ver el estado y progreso de sus tickets

**Pantallas principales:**
- Dashboard con sus tickets
- Formulario de creación de ticket
- Detalle de ticket con comentarios
- Perfil de usuario

**Flujo de trabajo:**
1. Iniciar sesión
2. Crear nuevo ticket desde el dashboard
3. Completar formulario (título, descripción, categoría, evidencias)
4. Hacer seguimiento del ticket
5. Agregar comentarios según sea necesario

#### 3. 💻 Desarrollador de Software

**Permisos:**
- Ver proyectos asignados
- Ver tickets de sus proyectos
- Actualizar estado de tickets
- Agregar comentarios técnicos
- Marcar tickets como resueltos
- Subir evidencias de solución

**Pantallas principales:**
- Lista de proyectos asignados
- Bandeja de tickets por proyecto
- Detalle de ticket con historial
- Perfil de usuario

**Flujo de trabajo:**
1. Ver proyectos asignados
2. Seleccionar proyecto
3. Ver lista de tickets pendientes
4. Trabajar en ticket y actualizar estado
5. Agregar comentarios de progreso
6. Marcar como resuelto con evidencia

#### 4. 📊 Product Owner

**Permisos:**
- Ver todos los tickets de sus proyectos
- Asignar tickets a desarrolladores
- Cambiar prioridad de tickets
- Aprobar resoluciones
- Ver métricas y reportes de proyecto
- Gestionar liberaciones

**Pantallas principales:**
- Dashboard con métricas de proyecto
- Vista de tickets por estado
- Asignación de recursos
- Reportes y analíticas

#### 5. 🎯 Agente Operativo (Junior/Senior)

**Permisos:**
- Recibir y clasificar tickets
- Asignar tickets a desarrolladores
- Actualizar estado de tickets
- Gestionar prioridades
- Ver bandeja de tickets operativos

**Pantallas principales:**
- Bandeja de tickets operativos
- Clasificación y asignación
- Seguimiento de SLA

### Funcionalidades Principales

#### 📝 Crear un Ticket (Cliente)

1. Iniciar sesión como Cliente
2. Click en "Nuevo Ticket" o botón "+"
3. Completar formulario:
   - **Título**: Resumen breve del problema
   - **Descripción**: Detalle completo del problema
   - **Categoría**: Seleccionar tipo (Bug, Feature, Soporte, etc.)
   - **Proyecto**: Seleccionar proyecto asociado
   - **Evidencias**: Subir imágenes o PDFs (opcional)
4. Click en "Crear Ticket"
5. El ticket se crea con estado "Abierto"

#### 💬 Agregar Comentarios

1. Abrir detalle del ticket
2. Scroll hasta la sección de comentarios
3. Escribir comentario en el campo de texto
4. Click en "Enviar"
5. El comentario aparece con tu nombre y timestamp

#### 📎 Subir Evidencias

1. En el formulario de ticket o detalle
2. Click en "Subir Archivo"
3. Seleccionar imagen (JPG, PNG) o PDF
4. El archivo se sube a AWS S3
5. Se muestra preview o link de descarga

#### 🔄 Actualizar Estado de Ticket (Desarrollador/PO)

1. Abrir detalle del ticket
2. Seleccionar nuevo estado del dropdown:
   - Abierto
   - En Progreso
   - Resuelto
   - Cerrado
3. Agregar comentario explicando el cambio
4. Click en "Actualizar"
5. Se registra en el historial

#### 📊 Ver Dashboard y Métricas

Cada rol tiene su propio dashboard con:
- **Gráficos de tickets** por estado (Recharts)
- **Tickets recientes**
- **Estadísticas** (total, abiertos, resueltos, cerrados)
- **Alertas de SLA** (tickets próximos a vencer)

---

## 🔌 API Endpoints

### Base URL

```
http://localhost:3000/api
```

### Documentación Swagger

Accede a la documentación interactiva en:
```
http://localhost:3000/docs
```

### Endpoints Principales

#### 🔐 Autenticación

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/login` | Iniciar sesión | ❌ |
| POST | `/refresh` | Renovar access token | ✅ |
| POST | `/logout` | Cerrar sesión | ✅ |

**Ejemplo Login:**
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@famat.com",
    "password": "admin123"
  }'
```

**Respuesta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id_usuario": 1,
    "nombre": "Admin",
    "apellido": "Sistema",
    "email": "admin@famat.com",
    "rol": {
      "id_rol": 1,
      "nombre_rol": "Administrador"
    }
  }
}
```

#### 👥 Usuarios

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/usuarios` | Listar usuarios | ✅ Admin |
| GET | `/usuarios/:id` | Obtener usuario | ✅ |
| POST | `/usuarios` | Crear usuario | ✅ Admin |
| PUT | `/usuarios/:id` | Actualizar usuario | ✅ Admin |
| DELETE | `/usuarios/:id` | Eliminar usuario | ✅ Admin |

#### 🎫 Tickets

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/tickets` | Listar tickets | ✅ |
| GET | `/tickets/:id` | Obtener ticket | ✅ |
| POST | `/tickets` | Crear ticket | ✅ |
| PUT | `/tickets/:id` | Actualizar ticket | ✅ |
| DELETE | `/tickets/:id` | Eliminar ticket | ✅ Admin |
| GET | `/tickets/proyecto/:id` | Tickets por proyecto | ✅ |
| GET | `/tickets/usuario/:id` | Tickets por usuario | ✅ |

#### 📁 Proyectos

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/proyectos` | Listar proyectos | ✅ |
| GET | `/proyectos/:id` | Obtener proyecto | ✅ |
| POST | `/proyectos` | Crear proyecto | ✅ Admin |
| PUT | `/proyectos/:id` | Actualizar proyecto | ✅ Admin |
| DELETE | `/proyectos/:id` | Eliminar proyecto | ✅ Admin |

#### 💬 Comentarios

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/comentarios/ticket/:id` | Comentarios de ticket | ✅ |
| POST | `/comentarios` | Crear comentario | ✅ |
| DELETE | `/comentarios/:id` | Eliminar comentario | ✅ |

#### 📎 Evidencias

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/evidencias/ticket/:id` | Evidencias de ticket | ✅ |
| POST | `/evidencias` | Subir evidencia | ✅ |
| DELETE | `/evidencias/:id` | Eliminar evidencia | ✅ |

### Headers Requeridos

Para endpoints autenticados, incluir:

```
Authorization: Bearer <access_token>
```

---

## 🗄️ Base de Datos

### Esquema de Base de Datos

![database_schema_1769542992245](https://github.com/user-attachments/assets/7d0e0424-a0bb-403c-b4b3-c49f4a258d9b)


### Modelos Principales

#### Usuario
```typescript
{
  id_usuario: number
  nombre: string
  apellido: string
  email: string
  password: string (encriptado)
  activo: boolean
  fecha_registro: Date
  id_rol: number
}
```

#### Ticket
```typescript
{
  id_ticket: number
  titulo: string
  descripcion: string
  fecha_creacion: Date
  fecha_resolucion?: Date
  fecha_limite_sla?: Date
  prioridad?: string
  id_proyecto: number
  id_usuario_creador: number
  id_usuario_responsable?: number
  id_estado: number
  id_categoria: number
}
```

#### Proyecto
```typescript
{
  id_proyecto: number
  nombre: string
  id_cliente: number
}
```

### Relaciones

- **Usuario → Rol**: Muchos a Uno
- **Usuario → Tickets Creados**: Uno a Muchos
- **Usuario → Tickets Responsable**: Uno a Muchos
- **Ticket → Proyecto**: Muchos a Uno
- **Ticket → Estado**: Muchos a Uno
- **Ticket → Categoría**: Muchos a Uno
- **Ticket → Comentarios**: Uno a Muchos
- **Ticket → Evidencias**: Uno a Muchos
- **Ticket → Historial**: Uno a Muchos
- **Proyecto → Cliente (Usuario)**: Muchos a Uno
- **Rol → Permisos**: Muchos a Muchos (rol_permiso)

### Comandos Prisma Útiles

```bash
# Ver base de datos en interfaz gráfica
npx prisma studio

# Crear nueva migración
npx prisma migrate dev --name nombre_migracion

# Aplicar migraciones en producción
npx prisma migrate deploy

# Resetear base de datos (¡CUIDADO!)
npx prisma migrate reset

# Generar cliente Prisma
npx prisma generate

# Formatear schema.prisma
npx prisma format
```

---

## 🛠️ Scripts Disponibles

### Backend (backend-api/)

```bash
# Desarrollo con hot reload
npm run dev

# Compilar TypeScript
npm run tsc

# Build para producción
npm run build

# Ejecutar en producción
npm start

# Abrir Prisma Studio
npx prisma studio

# Crear migración
npx prisma migrate dev

# Poblar base de datos
npx prisma db seed

# Generar hash de contraseña
tsx generate-hash.ts

# Verificar usuarios
tsx check-users.ts

# Test de login
tsx test-login.ts
```

### Frontend (jira/)

```bash
# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Ejecutar linter
npm run lint

# Servidor de desarrollo con host expuesto
npm run dev -- --host
```

---

## 🔒 Seguridad

### Implementaciones de Seguridad

- ✅ **Contraseñas encriptadas** con bcrypt (10 rounds)
- ✅ **JWT tokens** con expiración (15 minutos access, 7 días refresh)
- ✅ **Refresh tokens** almacenados en base de datos
- ✅ **CORS** configurado para dominios permitidos
- ✅ **Validación de datos** en todas las rutas
- ✅ **Control de acceso** basado en roles (RBAC)
- ✅ **URLs pre-firmadas** para S3 (expiran en 1 hora)
- ✅ **Headers de seguridad** implementados
- ✅ **Sanitización de inputs** para prevenir inyecciones

### Mejores Prácticas

1. **Nunca commitear** archivos `.env` al repositorio
2. **Usar variables de entorno** para datos sensibles
3. **Rotar secretos JWT** periódicamente en producción
4. **Implementar rate limiting** en producción
5. **Usar HTTPS** en producción
6. **Mantener dependencias actualizadas**

---

## 🚀 Despliegue en Producción

### Preparación

1. **Actualizar variables de entorno** para producción
2. **Configurar base de datos** PostgreSQL en la nube
3. **Configurar bucket S3** con políticas adecuadas
4. **Generar secretos JWT** seguros

### Backend (Railway/Render/Heroku)

```bash
# Build
npm run build

# Variables de entorno requeridas
DATABASE_URL=postgresql://...
JWT_SECRET=...
REFRESH_SECRET=...
FRONTEND_URL=https://tu-dominio.com
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=...
AWS_BUCKET_NAME=...

# Comando de inicio
npm start
```

### Frontend (Vercel/Netlify)

```bash
# Build
npm run build

# Variables de entorno
VITE_API_BASE_URL=https://api.tu-dominio.com/api

# Directorio de salida
dist/
```

---

## 🐛 Troubleshooting

### Problemas Comunes

#### Error: "Cannot connect to database"

```bash
# Verificar que PostgreSQL esté corriendo
docker ps

# Verificar DATABASE_URL en .env
cat backend-api/.env

# Reiniciar contenedor
docker compose restart
```

#### Error: "Prisma Client not generated"

```bash
cd backend-api
npx prisma generate
```

#### Error: "CORS policy blocked"

Verificar que `FRONTEND_URL` en backend `.env` coincida con la URL del frontend.

#### Error: "JWT token invalid"

El token expiró. Hacer logout y login nuevamente.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

## 👨‍💻 Equipo de Desarrollo

**Famat Consulting**
- Sistema desarrollado para gestión interna de tickets y proyectos


<div align="center">

**© 2025 Famat Support - Sistema de Gestión de Tickets**

</div>
