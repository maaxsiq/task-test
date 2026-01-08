import { Request, Response } from "express";
import { RegisterUserUseCase } from "../../application/use-cases/register-user.usecase.js";
import { LoginUserUseCase } from "../../application/use-cases/login-user.usecase.js";
import { PrismaUserRepository } from "../../domain/repositories/prisma-user-repository.js";

const userRepository = new PrismaUserRepository();

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const useCase = new RegisterUserUseCase(userRepository);
      const user = await useCase.execute(email, password);

      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const useCase = new LoginUserUseCase(userRepository);
      const result = await useCase.execute(email, password);

      return res.json(result);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
}
