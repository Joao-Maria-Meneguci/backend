import { Router } from "express";
import { createRoomController } from "./services/Rooms/CreateRoomService";
import { getRoomController } from "./services/Rooms/GetRoomService";
import { deleteRoomController } from "./services/Rooms/DeleteRoomService";
import { updateRoomController } from "./services/Rooms/UpdateRoomService";
import { getAllRoomController } from "./services/Rooms/GetAllRoomService";

const router = Router();

// Rooms routes
router.post('/room', (req, res) => {
    return createRoomController.createRoom(req, res);
})

router.get('/room/:name', (req, res) => {
    return getRoomController.getRoomByName(req, res);
})

router.delete('/room', (req, res) => {
    return deleteRoomController.deleteRoom(req, res);
})

router.put('/room', (req, res) => {
    return updateRoomController.updateRoom(req, res);
})

router.get('/rooms', (req, res) => {
    return getAllRoomController.getAllRooms(req, res);
})

export { router };