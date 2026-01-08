import { prisma } from "../database/prisma.js";
import { Task } from "../../domain/entities/task.js";
import { TaskRepository } from "../../domain/repositories/task-repository.js";

export class PrismaTaskRepository implements TaskRepository {
  async create(task: Task): Promise<void> {
    await prisma.task.create({
      data: {
        id: task.id,
        title: task.title,
        description: task.description,
        completed: task.completed,
        userId: task.userId,
        createdAt: task.createdAt,
      },
    });
  }

  async findByUserId(userId: string): Promise<Task[]> {
    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return tasks.map(
      (task) =>
        new Task({
          id: task.id,
          title: task.title,
          description: task.description,
          completed: task.completed,
          userId: task.userId,
          createdAt: task.createdAt,
        })
    );
  }

  async findById(taskId: string): Promise<Task | null> {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) return null;

    return new Task({
      id: task.id,
      title: task.title,
      description: task.description,
      completed: task.completed,
      userId: task.userId,
      createdAt: task.createdAt,
    });
  }

  async update(task: Task): Promise<void> {
    await prisma.task.update({
      where: { id: task.id },
      data: {
        title: task.title,
        description: task.description,
        completed: task.completed,
      },
    });
  }

  async delete(taskId: string): Promise<void> {
    await prisma.task.delete({
      where: { id: taskId },
    });
  }
}
