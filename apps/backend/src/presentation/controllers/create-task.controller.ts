import { Request, Response } from "express";
import { CreateTaskUseCase } from "../../application/use-cases/create-task/create-task.usecase.js";

export class CreateTaskController {
  constructor(private createTaskUseCase: CreateTaskUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { title, description } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    await this.createTaskUseCase.execute({
      title,
      description,
      userId,
    });

    return res.status(201).send();
  }
}
