import { Room } from "../models/Room";

export interface IRoomRepository {
    findByName(name: string): Promise<Room | undefined>;
    delete(name: string): Promise<void>;
    update(name: string, data: Partial<Room>): Promise<void>;
    save(room: Room): Promise<void>;
}