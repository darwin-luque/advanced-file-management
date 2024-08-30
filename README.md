# File Management System

## Overview

This is a web-based file management system that allows users to create, organize, and manage text-based files within a nested folder structure. The app includes features such as workspaces that can be shared between users, lazy loading, and cursor-based pagination for efficient data handling.

## Features

- **Nested Folders and Files:** Organize files within a hierarchical folder structure.
- **Workspaces:** Manage multiple workspaces, each containing its own set of folders and files.

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS, TypeScript
- **Backend:** tRPC, DrizzleORM, PostgreSQL
- **Deployment:** Vercel
- **Version Control:** Git/GitHub

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL

### Installation

1. Clone the repository:

  ```bash
  git clone https://github.com/your-username/your-repo-name.git
  cd your-repo-name
  ```

2. Install dependencies:

  ```bash
  bun install
  ```

3. Set up the environment variables by copying .env.example to .env and configuring the necessary values.

4. Run database and apply schema:

  ```bash
  docker compose up -d
  bun db:push
  ```

5. Start the development server:

  ```bash
  bun dev
  ```

6. Open your browser and go to http://localhost:3000.

## Folder Structure

- app/: Contains the Next.js pages and api routes.
  - app/**/_components: Specific components for each page.
- components/: Reusable React components.
- styles/: Global styles and Tailwind configuration.
- server/: Backend code including tRPC procedures and database models.
  - server/db/: Database connection and schema definitions.
  - server/api/: tRPC routers for handling API requests.
- utils/: Utility functions and helpers.

## Key Files

- trpc/: Contains the tRPC router and procedure definitions.
- db/: Database connection and schema definitions using DrizzleORM.

### API Endpoints

- /api/trpc: Main API route for handling tRPC requests.

### Deployment

This project is configured to deploy to Vercel. Simply connect the repository to your Vercel account and follow the instructions to deploy.

## Contributing

Feel free to submit issues and pull requests.
