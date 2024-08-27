import { CustomError } from "../../errors/CustomError";
import { Room } from "../../models/Room";
import type { IRoom } from "../../models/types/IRoom";
import type { IRoomRepository } from "../../repository/IRoomRepository";

export class CreateRoomService {
    constructor (
        private roomRepository: IRoomRepository,
    ) {}

    async execute(data: IRoom) {
        const roomAlreadyExists = await this.roomRepository.findByName(data.name);

        if (roomAlreadyExists) {
            throw new CustomError(409, 'exists');
        }

        const room = new Room(data);    

        await this.roomRepository.save(room);
    }
}