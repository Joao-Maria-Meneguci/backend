import { Room } from "../models/Room";

export interface IRoomRepository {
    findByName(name: string): Promise<Room | undefined>;
    delete(name: string): Promise<void>;
    save(room: Room): Promise<void>;
}