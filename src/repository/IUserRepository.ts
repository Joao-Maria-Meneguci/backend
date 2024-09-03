import { IUser, IUserUpdate } from "../models/types/IUser";
import type { User } from "../models/User";

export interface IUserRepository {
    getUser(name: string): Promise<Partial<User> | undefined>;
    save(user: User): Promise<void>;
    delete(email: string, password: string): Promise<void>;
    loginUser(email: string, password: string): Promise<true | undefined>;
    update(email: string, data: Partial<IUser>): Promise<void>;
}