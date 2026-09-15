import { Router } from "express";

const router = Router();

// Placeholder in-memory data — swap for a real database (Postgres, MongoDB, etc.)
let tasks = [
  { id: "t1", plantName: "Peace Lily", type: "water", day: "Mon" },
  { id: "t2", plantName: "Fiddle Leaf Fig", type: "feed", day: "Tue" },
];

router.get("/", (_req, res) => {
  res.json(tasks);
});

router.post("/", (req, res) => {
  const newTask = { id: crypto.randomUUID(), ...req.body };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

export default router;
