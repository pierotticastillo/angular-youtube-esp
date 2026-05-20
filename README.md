# Angular YouTube ESP

![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular&logoColor=white)
![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core-10-512BD4?logo=dotnet&logoColor=white)
![Entity Framework](https://img.shields.io/badge/Entity_Framework-Core-512BD4)
![SQL Server](https://img.shields.io/badge/SQL_Server-LocalDB-CC2927?logo=microsoftsqlserver&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-9-F69220?logo=pnpm&logoColor=white)
![Status](https://img.shields.io/badge/status-learning_project-2ecc71)

Aplicacion full stack para gestionar laptops con Angular, ASP.NET Core, Entity Framework y SQL Server LocalDB.

## Autor

- GitHub: [pierotticastillo](https://github.com/pierotticastillo)
- Portfolio: [pierotticastillo.netlify.app](https://pierotticastillo.netlify.app/#inicio)
- LinkedIn: [Enrique Alejandro Pierotti Castillo](https://www.linkedin.com/in/enriquealejandropierotticastillo/)

## Agradecimiento

Este proyecto esta inspirado en una idea del canal [Gavilanch2](https://www.youtube.com/@gavilanch2). Gracias por compartir contenido que ayuda a practicar desarrollo full stack con ejemplos concretos.

## Estructura

- `angular-frontend/`: aplicacion Angular.
- `core-web-api/`: solucion ASP.NET Core con Entity Framework.
- `api-clients/postman/`: coleccion Postman para probar la API.

## Funcionalidades

- Listar laptops.
- Crear laptops con validaciones.
- Editar laptops usando el ID de la URL.
- Eliminar laptops.
- Validar nombres vacios y nombres duplicados.
- Probar endpoints desde una coleccion Postman importable.

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

La coleccion para importar en Postman esta en:

```text
api-clients/postman/laptops-api.postman_collection.json
```

Variables incluidas:

- `baseUrl`: `https://localhost:7193`
- `laptopId`: `1`

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
