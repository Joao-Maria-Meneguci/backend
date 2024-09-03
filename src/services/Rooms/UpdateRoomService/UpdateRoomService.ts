import type { IRoomUpdate } from "../../../models/types/IRoom";
import type { IRoomRepository } from "../../../repository/IRoomRepository";

export class UpdateRoomService {

    constructor(
        private roomRepository: IRoomRepository
    ) {}

    async execute(data: IRoomUpdate) {
        await this.roomRepository.update(data.name, data);
    }
}