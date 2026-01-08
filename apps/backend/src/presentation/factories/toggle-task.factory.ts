import { PrismaTaskRepository } from "../../infrastructure/repositories/prisma-task.repository.js";
import { ToggleTaskStatusUseCase } from "../../application/use-cases/toggle-task/toggle-task.usecase.js";
import { ToggleTaskStatusController } from "../controllers/toggle-task.controller.js";

export function makeToggleTaskController() {
  const repository = new PrismaTaskRepository();
  const useCase = new ToggleTaskStatusUseCase(repository);

  return new ToggleTaskStatusController(useCase);
}
