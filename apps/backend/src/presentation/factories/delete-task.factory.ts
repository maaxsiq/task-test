import { PrismaTaskRepository } from "../../infrastructure/repositories/prisma-task.repository.js";
import { DeleteTaskUseCase } from "../../application/use-cases/delete-task/delete-task.usecase.js";
import { DeleteTaskController } from "../controllers/delete-task.controller.js";

export function makeDeleteTaskController() {
  const repository = new PrismaTaskRepository();
  const useCase = new DeleteTaskUseCase(repository);

  return new DeleteTaskController(useCase);
}
