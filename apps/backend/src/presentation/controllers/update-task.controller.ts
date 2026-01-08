import { Request, Response } from "express";
import { UpdateTaskUseCase } from "../../application/use-cases/update-task/update-task.usecase.js";

export class UpdateTaskController {
  constructor(private updateTaskUseCase: UpdateTaskUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, description } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      await this.updateTaskUseCase.execute({
        taskId: id,
        userId,
        title,
        description,
      });

      return res.status(204).send();
    } catch (error: any) {
      if (error.message === "Task not found") {
        return res.status(404).json({ message: error.message });
      }

      if (error.message === "Unauthorized") {
        return res.status(403).json({ message: error.message });
      }

      if (error.message === "Title is required") {
        return res.status(400).json({ message: error.message });
      }

      return res.status(400).json({ message: "Unexpected error" });
    }
  }
}
