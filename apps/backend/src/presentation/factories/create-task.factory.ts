import { PrismaTaskRepository } from "../../infrastructure/repositories/prisma-task.repository.js";
import { CreateTaskUseCase } from "../../application/use-cases/create-task/create-task.usecase.js";
import { CreateTaskController } from "../controllers/create-task.controller.js";

export function makeCreateTaskController() {
  const repository = new PrismaTaskRepository();
  const useCase = new CreateTaskUseCase(repository);

  return new CreateTaskController(useCase);
}
