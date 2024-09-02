import { UpdateRoomService } from "./UpdateRoomService";
import { RoomController } from "../../controllers/RoomController";
import { PostgresRoomRepository } from "../../repository/implementantions/PostgresRoomRepository";

const postgresRoomRepository = new PostgresRoomRepository();

const updateRoomService = new UpdateRoomService(postgresRoomRepository);

const updateRoomController = new RoomController({updateRoomService});

export { updateRoomController }