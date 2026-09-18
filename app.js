import express from "express";
import db from "./db.js";
import cors from "cors";

const app = express();

app.use(express.json()); // parse requests with Content-Type of application/json
app.use(cors({ origin: "http://localhost:5173" })); // only accept requests from kanban ui

const port = 3000;

app.get("/", (req, res) => {
  res.send("Kanban Board Running");
});

app.get("/tasks", (req, res) => {
  const tasks = db.prepare("SELECT * FROM tasks").all();

  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
  res.json(task);
});

app.post("/tasks", (req, res) => {
  const { title, priority, due_date, column_name } = req.body;
  const result = db
    .prepare(
      "INSERT INTO tasks (title, priority, due_date, column_name) VALUES (?, ?, ?, ?)",
    )
    .run(title, priority, due_date, column_name);

  const newTask = db
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(result.lastInsertRowid);
  res.status(201).json(newTask);
});

app.patch("/tasks/:id", (req, res) => {
  const { column_name } = req.body;
  const { id } = req.params;

  const result = db
    .prepare("UPDATE tasks SET column_name = ? WHERE id = ?")
    .run(column_name, id);
  res.json(result);
});

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const result = db
    .prepare("DELETE FROM tasks WHERE id = ?")
    .run(req.params.id);
  res.json(result);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
