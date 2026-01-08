import { TaskRepository } from "../../../domain/repositories/task-repository.js";

interface UpdateTaskInput {
  taskId: string;
  userId: string;
  title?: string;
  description?: string;
}

export class UpdateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(input: UpdateTaskInput): Promise<void> {
    const task = await this.taskRepository.findById(input.taskId);

    if (!task) {
      throw new Error("Task not found");
    }

    if (task.userId !== input.userId) {
      throw new Error("Unauthorized");
    }

    if (input.title !== undefined) {
      if (!input.title || input.title.trim().length === 0) {
        throw new Error("Title is required");
      }
      (task as any).props.title = input.title;
    }

    if (input.description !== undefined) {
      (task as any).props.description = input.description;
    }

    await this.taskRepository.update(task);
  }
}
