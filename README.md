# Fullstack Task Manager — TypeScript

Aplicação web fullstack para gerenciamento de tarefas pessoais, desenvolvida como parte de um teste técnico para Desenvolvedor Fullstack TypeScript.

O sistema permite que usuários se cadastrem, façam login e gerenciem suas próprias tarefas de forma segura, utilizando autenticação JWT.

---

## Arquitetura

O projeto foi desenvolvido como um monorepo, contendo dois aplicativos principais:

- **Backend**: API RESTful em Node.js + TypeScript
- **Frontend**: Aplicação web em React + TypeScript

---

## Backend

O backend segue os princípios da Clean Architecture, com separação clara entre:

- **Domain**: entidades e contratos
- **Application**: casos de uso
- **Infrastructure**: banco de dados e integrações
- **Presentation**: controllers, rotas e middlewares

Essa abordagem garante baixo acoplamento, facilidade de manutenção e maior testabilidade.

---

## Frontend

O frontend utiliza uma estrutura simples e organizada:

- **pages**: telas da aplicação
- **auth**: contexto de autenticação e rotas protegidas
- **api**: cliente HTTP centralizado
- **types**: tipagens compartilhadas

---

## Tecnologias Utilizadas

### Backend

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- JWT
- bcrypt

### Frontend

- React
- TypeScript
- Vite
- Material UI
- React Router DOM
- Axios

### Ferramentas

- PNPM
- ESLint
- Prettier
- Git

---

### Pré-requisitos

- Node.js >= 18
- PostgreSQL
- PNPM

---

## Como Executar o Projeto

### NA PASTA RAIZ -> Instale as dependências

```bash
pnpm install
```

## Backend

### 1. Acesse a pasta do backend

```bash
cd apps/backend
```

### 2. Crie o arquivo `.env`

Antes de instalar dependências ou executar qualquer comando do Prisma, crie o arquivo `.env` na pasta `apps/backend` com o conteúdo abaixo:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/task_manager
JWT_SECRET=your-secret-key
```

Ajuste `user`, `password` e o nome do banco conforme o seu ambiente local.

### 3. Execute o generate

```bash
pnpm prisma generate
```

### 4. Execute as migrations

```bash
pnpm prisma migrate dev
```

### 5. Inicie o servidor

```bash
pnpm dev
```

O backend estará disponível em:

```
http://localhost:3333
```

---

## Frontend

### 1. Acesse a pasta do frontend

```bash
cd apps/frontend
```

### 2. Inicie a aplicação

```bash
pnpm dev
```

Acesse:

```
http://localhost:5173
```

---

## Decisões de Design

- Clean Architecture no backend para separação de responsabilidades
- Autenticação JWT stateless
- Material UI para interface moderna e responsiva
- Axios com interceptor para envio automático do token
- Monorepo para organização do projeto

---

## Uso de IA Generativa

A IA foi utilizada para:

- Planejamento da arquitetura
- Definição da estrutura do monorepo
- Revisão de código
- Apoio em decisões técnicas

Todo o código foi revisado, compreendido e ajustado manualmente.  
A IA foi utilizada apenas como ferramenta de apoio.

---

## Prompt Utilizado para Criação do Projeto

Crie uma aplicação web fullstack utilizando TypeScript tanto no backend quanto no frontend.  
O backend deve ser uma API RESTful com autenticação JWT, utilizando PostgreSQL como banco de dados e seguindo os princípios da Clean Architecture.  
O sistema deve permitir cadastro e login de usuários, além de um CRUD completo de tarefas pessoais, garantindo isolamento de dados por usuário.  
O frontend deve ser desenvolvido em React com TypeScript, utilizando Material UI para a interface, consumindo a API REST e protegendo rotas autenticadas.  
O projeto deve ser estruturado como um monorepo, priorizando código limpo, organização e boas práticas.

---

## Funcionalidades

- Cadastro de usuário
- Login com JWT
- Logout
- Rotas protegidas
- CRUD completo de tarefas
- Isolamento de dados por usuário
