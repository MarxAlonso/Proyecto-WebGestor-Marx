# GestorMarx API

Backend en Node.js + TypeScript para GestorMarx.

## Instalación

```bash
npm install
```

## Ejecución

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm run build
npm start
```

## Variables de Entorno
Asegúrate de tener un archivo `.env` con:

```
GESTORMARX_URL="postgresql://..."
JWT_SECRET="secret"
PORT=3001
```

## Estructura
- `src/config`: Configuración de DB
- `src/controllers`: Lógica de los endpoints
- `src/middleware`: Middlewares (Auth)
- `src/routes`: Definición de rutas
- `src/services`: Lógica de negocio y consultas a DB
- `src/types`: Definiciones de tipos TypeScript
