import { IRoom } from "../../../models/types/IRoom";
import { PostgresRoomRepository } from "../../../repository/implementantions/PostgresRoomRepository";

export class GetAllRoomService {
    constructor(
        private postgresRoomRepository: PostgresRoomRepository
    ) {}

    async execute(): Promise<IRoom[]> {
        const rooms = await this.postgresRoomRepository.findAll();
        return rooms;
    }
}