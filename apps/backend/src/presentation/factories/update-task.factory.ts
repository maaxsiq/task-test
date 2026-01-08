import { PrismaTaskRepository } from "../../infrastructure/repositories/prisma-task.repository.js";
import { UpdateTaskUseCase } from "../../application/use-cases/update-task/update-task.usecase.js";
import { UpdateTaskController } from "../controllers/update-task.controller.js";

export function makeUpdateTaskController() {
  const repository = new PrismaTaskRepository();
  const useCase = new UpdateTaskUseCase(repository);

  return new UpdateTaskController(useCase);
}
