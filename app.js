import express from "express";

const app = express();

// parse requests with Content-Type of application/json
app.use(express.json());

const port = 3000;

app.get("/", (req, res) => {
  res.send("Kanban Board Running");
});

app.get("/tasks", (req, res) => {
  res.send("Get list of existing tasks from db");
});

app.get("/tasks/:id", (req, res) => {
  res.send("Get specific task from db");
});

app.post("/tasks", (req, res) => {
  res.send("Add new task to db");
});

app.put("/tasks/:id", (req, res) => {
  res.send("Update task state in db");
});

app.delete("/tasks/:id", (req, res) => {
  res.send("Delete task from db");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
