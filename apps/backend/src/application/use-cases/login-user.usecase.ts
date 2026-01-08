import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../../domain/repositories/user-repository.js";

export class LoginUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    return {
      token,
    };
  }
}
