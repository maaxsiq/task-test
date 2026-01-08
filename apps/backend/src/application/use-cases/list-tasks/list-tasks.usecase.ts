import { TaskRepository } from "../../../domain/repositories/task-repository.js";
import { Task } from "../../../domain/entities/task.js";

export class ListTasksByUserUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(userId: string): Promise<Task[]> {
    return this.taskRepository.findByUserId(userId);
  }
}
