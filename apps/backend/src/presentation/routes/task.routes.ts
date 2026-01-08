import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { makeCreateTaskController } from "../factories/create-task.factory.js";
import { makeListTasksController } from "../factories/list-tasks.factory.js";
import { makeToggleTaskController } from "../factories/toggle-task.factory.js";
import { makeUpdateTaskController } from "../factories/update-task.factory.js";
import { makeDeleteTaskController } from "../factories/delete-task.factory.js";

const taskRoutes = Router();

taskRoutes.post("/", authMiddleware, async (req, res) => {
  const controller = makeCreateTaskController();
  return controller.handle(req, res);
});

taskRoutes.get("/", authMiddleware, async (req, res) => {
  const controller = makeListTasksController();
  return controller.handle(req, res);
});

taskRoutes.patch("/:id/toggle", authMiddleware, async (req, res) => {
  return makeToggleTaskController().handle(req, res);
});

taskRoutes.put("/:id", authMiddleware, async (req, res) => {
  return makeUpdateTaskController().handle(req, res);
});

taskRoutes.delete("/:id", authMiddleware, async (req, res) => {
  return makeDeleteTaskController().handle(req, res);
});

export { taskRoutes };
