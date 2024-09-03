import type { User } from "../../../models/User";
import type { IUserRepository } from "../../../repository/IUserRepository";

export class GetUserService {
    constructor(
        private userRepository: IUserRepository
    ) {}

    async execute(email: string): Promise<Partial<User> | undefined> {
        return await this.userRepository.getUser(email);
    }
}