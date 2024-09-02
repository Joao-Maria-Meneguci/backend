import { GetAllRoomService } from "./GetAllRoomService";
import { PostgresRoomRepository } from "../../repository/implementantions/PostgresRoomRepository";
import { RoomController } from "../../controllers/RoomController";

const postgresRoomRepository = new PostgresRoomRepository();

const getAllRoomService = new GetAllRoomService(postgresRoomRepository);

const getAllRoomController = new RoomController({getAllRoomService});

export { getAllRoomController }