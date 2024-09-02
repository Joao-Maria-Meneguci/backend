import { CreateRoomController } from "../../controllers/CreateRoomController";
import { PostgresRoomRepository } from "../../repository/implementantions/PostgresRoomRepository";
import { CreateRoomService } from "./CreateRoomService";

const postgresRoomRepository = new PostgresRoomRepository();

const createRoomService = new CreateRoomService(postgresRoomRepository);

const createRoomController = new CreateRoomController(createRoomService);

export { createRoomService, createRoomController }