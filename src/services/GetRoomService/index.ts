import { RoomController } from "../../controllers/RoomController";
import { PostgresRoomRepository } from "../../repository/implementantions/PostgresRoomRepository";
import { GetRoomService } from "./GetRoomService";

const postgresRoomRepository = new PostgresRoomRepository();

const getRoomService = new GetRoomService(postgresRoomRepository);

const getRoomController = new RoomController({getRoomService: getRoomService,});

export { getRoomController }