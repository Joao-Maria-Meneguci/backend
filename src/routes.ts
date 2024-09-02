import { Router } from "express";
import { createRoomController } from "./services/CreateRoomService";
import { getRoomController } from "./services/GetRoomService";
import { deleteRoomController } from "./services/DeleteRoomService";

const router = Router();

router.post('/room', (req, res) => {
    return createRoomController.createRoom(req, res);
})

router.get('/room/:name', (req, res) => {
    return getRoomController.getRoomByName(req, res);
})

router.delete('/room', (req, res) => {
    return deleteRoomController.deleteRoom(req, res);
})

export { router };