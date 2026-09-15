import express from "express";
import cors from "cors";
import "dotenv/config";
import plantsRouter from "./src/routes/plants";
import tasksRouter from "./src/routes/tasks";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "http://localhost:5173" })); // your Vite client's dev URL
app.use(express.json());

app.use("/api/plants", plantsRouter);
app.use("/api/tasks", tasksRouter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Sprout server running on http://localhost:${PORT}`);
});
