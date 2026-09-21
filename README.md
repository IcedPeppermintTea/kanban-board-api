# Kanban Board API

A REST API for managing kanban tasks, built with Node.js, Express, and SQLite. Powers the [Kanban Board UI](https://icedpepperminttea.github.io/kanban-board-ui/).

[Frontend Repo](https://github.com/IcedPeppermintTea/kanban-board-ui)

## Table of Contents

- [About](#about)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Roadmap](#roadmap)

---

## About

A small REST API built to give the Kanban Board React app persistent storage.

Tasks are stored in a SQLite database and exposed through a set of REST endpoints that the frontend calls to create, read, update, and delete tasks as they're added, moved between columns, or removed.

## Features

- **Full CRUD** — create, read, update, and delete tasks
- **SQLite persistence** — tasks are stored in a real database, not memory, so data survives server restarts
- **REST conventions** — resource-based routes (`/tasks`, `/tasks/:id`) using standard HTTP methods and status codes
- **CORS configured** — locked to a specific allowed origin via environment variable, not left open by default
- **Environment-based configuration** — database path and allowed origin are both configurable, so the same code runs locally and in production without changes

## Getting Started

### Prerequisites

- **Node.js** >= 20 (includes npm)
- **better-sqlite3** — SQLite driver (installed via npm, no separate database server needed)

```bash
node --version
npm --version
```

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/icedpepperminttea/kanban-board-api.git
   cd kanban-board-api
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up environment variables

   ```bash
   cp .env.example .env
   # then fill in the values in .env — see Configuration below
   ```

4. Start the dev server

   ```bash
   npm run dev
   ```

The API will be running at `http://localhost:3000`. The SQLite database file and `tasks` table are created automatically on first run — no manual setup step needed.

## Usage

```bash
npm run dev
```

Example request, using curl:

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Express","priority":"High","due_date":"2026-10-01","column_name":"todo"}'
```

## API Reference

| Method   | Route        | Description                               | Body                                         |
| -------- | ------------ | ----------------------------------------- | -------------------------------------------- |
| `GET`    | `/tasks`     | Get all tasks                             | —                                            |
| `GET`    | `/tasks/:id` | Get a single task by id                   | —                                            |
| `POST`   | `/tasks`     | Create a new task                         | `{ title, priority, due_date, column_name }` |
| `PATCH`  | `/tasks/:id` | Update a task (e.g. move to a new column) | `{ column_name }`                            |
| `DELETE` | `/tasks/:id` | Delete a task                             | —                                            |

**Task shape returned by the API:**

```json
{
  "id": 1,
  "title": "Learn Express",
  "priority": "High",
  "due_date": "2026-10-01",
  "column_name": "todo"
}
```

## Configuration

| Variable        | Description                                         | Default                   | Required                                                        |
| --------------- | --------------------------------------------------- | ------------------------- | --------------------------------------------------------------- |
| `DB_PATH`       | Path to the SQLite database file                    | `kanban.db` (local file)  | No — only needed in production, to point at a persistent volume |
| `CLIENT_ORIGIN` | The frontend origin allowed to make requests (CORS) | none (allows all origins) | Recommended in production                                       |

Locally, leaving both unset is fine. The API falls back to a local `kanban.db` file and allows all origins, which is sufficient for development.

## Project Structure

```
.
├── app.js          # Express app, routes
├── db.js           # Database connection and schema setup
├── .env.example    # Sample environment variables
└── package.json
```

## Deployment

This API is deployed on [Railway](https://railway.com)

## Roadmap

- [ ] Input validation on POST/PATCH (currently trusts the request body as-is)
- [ ] Proper error responses (404s, 400s) instead of relying on default Express error pages
- [ ] Support editing a task's title, priority, and due date (currently only `column_name` can be updated)
- [ ] Migrate to PostgreSQL (if the project ever needs concurrent multi-writer support)
- [ ] BUG FIX: task priority label not saving
- [ ] BUG FIX: task due date label not saving
