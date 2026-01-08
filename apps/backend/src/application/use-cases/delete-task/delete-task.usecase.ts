import { TaskRepository } from "../../../domain/repositories/task-repository.js";

export class DeleteTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(taskId: string, userId: string): Promise<void> {
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new Error("Task not found");
    }

    if (task.userId !== userId) {
      throw new Error("Unauthorized");
    }

    await this.taskRepository.delete(taskId);
  }
}
