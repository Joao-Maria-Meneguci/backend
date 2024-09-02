import { IUserUpdate } from "../../../models/types/IUser";
import type { IUserRepository } from "../../../repository/IUserRepository";

export class UpdateUserService {
    constructor(
        private userRepository: IUserRepository
    ) {}

    async execute(data: IUserUpdate): Promise<void> {
        await this.userRepository.update(data.email, data);
        return;
    }
}