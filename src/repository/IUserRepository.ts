import { IUser, IUserUpdate } from "../models/types/IUser";
import type { User } from "../models/User";

export interface IUserRepository {
    findByEmail(name: string): Promise<User | undefined>;
    save(user: User): Promise<void>;
    delete(email: string, password: string): Promise<void>;
    update(email: string, data: Partial<IUser>): Promise<void>;
}