import type { IUserRepository } from "../../../repository/IUserRepository";

export class DeleteUserService {
    constructor(
        private userRepository: IUserRepository
    ) {}

    async execute(email: string, password: string): Promise<void> {
        await this.userRepository.delete(email, password);
        return;
    }
}