import { randomUUID } from "crypto";
import { Task } from "../../../domain/entities/task.js";
import { TaskRepository } from "../../../domain/repositories/task-repository.js";
import { CreateTaskInput } from "./create-task.dto.js";

export class CreateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(input: CreateTaskInput): Promise<void> {
    const task = new Task({
      id: randomUUID(),
      title: input.title,
      description: input.description,
      completed: false,
      userId: input.userId,
      createdAt: new Date(),
    });

    await this.taskRepository.create(task);
  }
}
