import type { IUser } from "../../../models/types/IUser";
import type { IUserRepository } from "../../../repository/IUserRepository";

export class CreateUserService {
    constructor(
        private userRepository: IUserRepository
    ) {}

    async execute(data: IUser): Promise<void> {
        await this.userRepository.save(data);
        return;
    }
}