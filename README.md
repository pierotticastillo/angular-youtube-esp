# Angular YouTube ESP

Aplicacion full stack con frontend Angular y API ASP.NET Core.

## Estructura

- `angular-frontend/`: aplicacion Angular.
- `core-web-api/`: solucion ASP.NET Core con Entity Framework.

## Requisitos

- Node.js
- pnpm
- .NET SDK 10
- SQL Server LocalDB o SQL Server compatible con la connection string configurada.

## Levantar el frontend

```bash
cd angular-frontend
pnpm install
pnpm start
```

La app queda disponible en `http://localhost:4200`.

## Levantar la API

```bash
cd core-web-api
dotnet restore
dotnet run --project core-web-api/core-web-api.csproj
```

La URL HTTPS usada por el frontend esta configurada en:

- `angular-frontend/src/environments/environment.ts`
- `angular-frontend/src/environments/environment.development.ts`

## Cliente API

La coleccion para importar en Postman esta en `api-clients/postman/laptops-api.postman_collection.json`.

## Verificaciones

Frontend:

```bash
cd angular-frontend
pnpm test -- --watch=false
pnpm run build
```

Backend:

```bash
cd core-web-api
dotnet build core-web-api.slnx
```

## Git

Este directorio raiz esta preparado para ser el unico repositorio. No se deben versionar `node_modules`, `dist`, `.angular`, `bin`, `obj`, `.vs` ni archivos `*.user`.
