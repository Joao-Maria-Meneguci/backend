import { Router } from "express";
import { createRoomController } from "./services/CreateRoomService";
import { getRoomController } from "./services/GetRoomService";

const router = Router();

router.post('/room', (req, res) => {
    return createRoomController.createRoom(req, res);
})

router.get('/room/:name', (req, res) => {
    return getRoomController.getRoomByName(req, res);
})

export { router };