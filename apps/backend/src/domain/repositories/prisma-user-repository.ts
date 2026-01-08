import { UserRepository } from "./user-repository.js";
import { prisma } from "../../infrastructure/database/prisma.js";
import { User } from "../entities/User.js";

export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    return new User(
      user.id,
      user.email,
      user.password,
      user.createdAt,
      user.updatedAt
    );
  }

  async create(email: string, password: string): Promise<User> {
    const user = await prisma.user.create({
      data: { email, password },
    });

    return new User(
      user.id,
      user.email,
      user.password,
      user.createdAt,
      user.updatedAt
    );
  }
}
