import { Router } from "express";
import { createRoomController } from "./services/Rooms/CreateRoomService";
import { getRoomController } from "./services/Rooms/GetRoomService";
import { deleteRoomController } from "./services/Rooms/DeleteRoomService";
import { updateRoomController } from "./services/Rooms/UpdateRoomService";
import { getAllRoomController } from "./services/Rooms/GetAllRoomService";
import { roomController } from "./services/Users";

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

// Users routes
router.post('/user', (req, res) => {
    return roomController.createUser(req, res);
})

router.get('/user/:user', (req, res) => {
    return roomController.getUser(req, res);
})

router.delete('/user', (req, res) => {
    return roomController.deleteUser(req, res);
})

router.put('/user', (req, res) => {
    return roomController.updateUser(req, res);
})

export { router };