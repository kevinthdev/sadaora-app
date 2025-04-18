# 📦 Sadaora App

A full-stack application built with **React** (Frontend), **Node.js + Express** (Backend), **SQLite** (Database), and **Prisma** (ORM).
This porject is designed to run locally and deploy easily using Vercel, Render, Railway or similar platforms.

## ⚙️ Tech Stack

- **Frontend**: React, Vite, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: SQLite (via Prisma ORM)
- **Dev Tools**: ESLint, Prettier

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/kevinthdev/sadaora-app.git
cd sadaora-app
```

### 2. Instructions

```bash
npm install
npm run prisma:generate
npm run dev
```

To access the application, open the following URL in your browser: http://127.0.0.1:5173/

## Architectural decisions

### 1. Frontend - React and Vite
 **React**: Using React allows us to build a dynamic and interactive user interface efficiently. We can break the app into reusable components, making it more maintainable.

 **Vite**: A modern, fast build tool that significantly improves the development experience with fast hot module replacement (HMR). It improves build time and enhances the developer workflow.

 **Component Structure**: Organize the components in a logical folder structure (e.g., components, pages, hooks, utils). This keeps things clean and modular.

 **State Management**: Use React's Context API for lightweight global state management or Redux for larger and more complex states.

 **Error Handling**: Ensure that components have proper error boundaries and that API errors are caught gracefully.

### 2. Backend - Node.js, Express, and Prisma
 **Node.js and Express**: The use of Node.js with Express offers an asynchronous, event-driven architecture, making it well-suited for handling a large number of I/O operations (e.g., database queries, API requests). Express simplifies routing and middleware integration.

 **Prisma ORM**: Prisma helps with database management and provides a clear and efficient way to interact with the SQLite database. It ensures type safety and autocompletion while querying, which minimizes runtime errors.

 **Folder Structure**: Keep the backend clean by organizing routes, middlewares, controllers, utils, and types in separate folders.

 ## Any assumptions made
  - **Deactive Account**
  - **Error Boundary**
  - **404 Page**
  - **Pagination and Search**