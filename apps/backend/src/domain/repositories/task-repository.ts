import { Task } from "../entities/task.js";

export interface TaskRepository {
  create(task: Task): Promise<void>;
  findByUserId(userId: string): Promise<Task[]>;
  findById(taskId: string): Promise<Task | null>;
  update(task: Task): Promise<void>;
  delete(taskId: string): Promise<void>;
}
