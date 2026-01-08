import { PrismaTaskRepository } from "../../infrastructure/repositories/prisma-task.repository.js";
import { ListTasksByUserUseCase } from "../../application/use-cases/list-tasks/list-tasks.usecase.js";
import { ListTasksController } from "../controllers/list-tasks.controller.js";

export function makeListTasksController() {
  const repository = new PrismaTaskRepository();
  const useCase = new ListTasksByUserUseCase(repository);

  return new ListTasksController(useCase);
}
