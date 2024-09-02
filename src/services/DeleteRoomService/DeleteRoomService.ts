import { CustomError } from "../../errors/CustomError";
import { IRoomRepository } from "../../repository/IRoomRepository";

export class DeleteRoomService {
    constructor(
        private roomRepository: IRoomRepository
    ) {}

    async execute(name: string) {
        const room = await this.roomRepository.findByName(name);
        
        if (!room) {
            throw new CustomError(404, 'Room not found');
        }
        
        await this.roomRepository.delete(name);
        return room;
    }
}