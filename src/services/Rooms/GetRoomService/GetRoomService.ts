import { IRoomRepository } from "../../../repository/IRoomRepository";

export class GetRoomService {
    constructor(
        private roomRepository: IRoomRepository,
    ) {}
    async execute(name: string) {
        const room = await this.roomRepository.findByName(name);
        return room;
    }
}