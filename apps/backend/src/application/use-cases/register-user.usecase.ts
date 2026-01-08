import bcrypt from "bcrypt";
import { UserRepository } from "../../domain/repositories/user-repository.js";

export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(email: string, password: string) {
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.create(email, hashedPassword);

    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
