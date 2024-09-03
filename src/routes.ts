import { Router } from "express";
import { roomController } from "./services/Rooms";

const router = Router();

// Rooms routes
router.post('/room', (req, res) => {
    return roomController.createRoom(req, res);
})

router.get('/room/:name', (req, res) => {
    return roomController.getRoomByName(req, res);
})

router.delete('/room', (req, res) => {
    return roomController.deleteRoom(req, res);
})

router.put('/room', (req, res) => {
    return roomController.updateRoom(req, res);
})

router.get('/rooms', (req, res) => {
    return roomController.getAllRooms(req, res);
})

export { router };