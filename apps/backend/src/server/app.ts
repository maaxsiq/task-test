import express from "express";
import cors from "cors";
import { authRoutes } from "../presentation/routes/auth.routes.js";
import { taskRoutes } from "../presentation/routes/task.routes.js";

export const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});
