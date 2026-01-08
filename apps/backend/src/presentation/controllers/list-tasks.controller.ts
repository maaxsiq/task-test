import { Request, Response } from "express";
import { ListTasksByUserUseCase } from "../../application/use-cases/list-tasks/list-tasks.usecase.js";

export class ListTasksController {
  constructor(private listTasksByUserUseCase: ListTasksByUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const tasks = await this.listTasksByUserUseCase.execute(userId);

    return res.json(
      tasks.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        completed: task.completed,
        createdAt: task.createdAt,
      }))
    );
  }
}
