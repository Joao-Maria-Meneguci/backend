import { Room } from "../models/Room";

export interface IRoomRepository {
    findByName(name: string): Promise<Room | undefined>;
    save(room: Room): Promise<void>;
}