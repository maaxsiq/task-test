import { Request, Response } from "express";
import { ToggleTaskStatusUseCase } from "../../application/use-cases/toggle-task/toggle-task.usecase.js";

export class ToggleTaskStatusController {
  constructor(private toggleTaskStatusUseCase: ToggleTaskStatusUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      await this.toggleTaskStatusUseCase.execute(id, userId);
      return res.status(204).send();
    } catch (error: any) {
      if (error.message === "Task not found") {
        return res.status(404).json({ message: error.message });
      }

      if (error.message === "Unauthorized") {
        return res.status(403).json({ message: error.message });
      }

      return res.status(400).json({ message: "Unexpected error" });
    }
  }
}
