import { CustomError } from "../../../errors/CustomError";
import type { User } from "../../../models/User";
import type { IUserRepository } from "../../../repository/IUserRepository";

export class LoginUserService {
    constructor(
        private userRepository: IUserRepository
    ) {}

    async execute(email: string, password: string): Promise<true | undefined> {
        const user = await this.userRepository.loginUser(email, password);

        if (!user) throw new CustomError(401, "Invalid email or password");

        return user;
    }
}