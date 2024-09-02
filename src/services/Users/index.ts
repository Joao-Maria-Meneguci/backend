import { PostgresUserRepository } from "../../repository/implementantions/PostgresUserRepository";
import { UserController } from "../../controllers/UserController";

import { CreateUserService } from "./CreateUserService/CreateUserService";
import { GetUserService } from "./GetUserService/GetUserService";
import { DeleteUserService } from "./DeleteUserService/DeleteUserService";
import { UpdateUserService } from "./UpdateUserService/UpdateUserService";

const postgresUserRepository = new PostgresUserRepository();

const createUserService = new CreateUserService(postgresUserRepository);
const getUserService = new GetUserService(postgresUserRepository);
const deleteUserService = new DeleteUserService(postgresUserRepository);
const updateUserService = new UpdateUserService(postgresUserRepository);

const roomController = new UserController({createUserService, getUserService, deleteUserService, updateUserService});

export { roomController }