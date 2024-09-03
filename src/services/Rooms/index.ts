import { CreateRoomService } from "./CreateRoomService/CreateRoomService";
import { GetAllRoomService } from "./GetAllRoomService/GetAllRoomService";
import { GetRoomService } from "./GetRoomService/GetRoomService";
import { UpdateRoomService } from "./UpdateRoomService/UpdateRoomService";
import { DeleteRoomService } from "./DeleteRoomService/DeleteRoomService";
import { RoomController } from "../../controllers/RoomController";
import { PostgresRoomRepository } from "../../repository/implementantions/PostgresRoomRepository";

const postgresRoomRepository = new PostgresRoomRepository();

const createRoomService = new CreateRoomService(postgresRoomRepository);
const getAllRoomService = new GetAllRoomService(postgresRoomRepository);
const getRoomService = new GetRoomService(postgresRoomRepository);
const updateRoomService = new UpdateRoomService(postgresRoomRepository);
const deleteRoomService = new DeleteRoomService(postgresRoomRepository);

const roomController = new RoomController({
    createRoomService,
    getAllRoomService,
    getRoomService,
    updateRoomService,
    deleteRoomService
});

export { roomController }