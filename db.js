/*
db.js
Handles creating and opening the kanban database
*/

import Database from "better-sqlite3";

const dbPath = process.env.DB_PATH || "kanban.db";
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    priority TEXT NOT NULL,
    due_date TEXT,
    column_name TEXT NOT NULL DEFAULT 'todo'
  )
`);

export default db;
