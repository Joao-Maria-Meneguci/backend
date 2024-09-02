import { RoomController } from "../../../controllers/RoomController";
import { PostgresRoomRepository } from "../../../repository/implementantions/PostgresRoomRepository";
import { CreateRoomService } from "./CreateRoomService";

const postgresRoomRepository = new PostgresRoomRepository();

const createRoomService = new CreateRoomService(postgresRoomRepository);

const createRoomController = new RoomController({createRoomService});

export { createRoomController }