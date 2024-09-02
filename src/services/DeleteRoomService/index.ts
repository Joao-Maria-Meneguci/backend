import { DeleteRoomService } from "./DeleteRoomService";
import { PostgresRoomRepository } from "../../repository/implementantions/PostgresRoomRepository";
import { RoomController } from "../../controllers/RoomController";

const postgresRoomRepository = new PostgresRoomRepository();

const deleteRoomService = new DeleteRoomService(postgresRoomRepository);

const deleteRoomController = new RoomController({deleteRoomService});

export { deleteRoomController }
