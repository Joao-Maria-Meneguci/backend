import { Router } from "express";
import { roomController } from "./services/Rooms";
import { userController } from "./services/Users";

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

// Users routes
router.post('/user', (req, res) => {
    return userController.createUser(req, res);
})

router.get('/user/:email', (req, res) => {
    return userController.getUser(req, res);
})

router.delete('/user', (req, res) => {
    return userController.deleteUser(req, res);
})

router.put('/user', (req, res) => {
    return userController.updateUser(req, res);
})

router.post('/user/login', (req, res) => {
    return userController.loginUser(req, res);
})

// Users routes
router.post('/user', (req, res) => {
    return userController.createUser(req, res);
})

router.get('/user/:email', (req, res) => {
    return userController.getUser(req, res);
})

router.delete('/user', (req, res) => {
    return userController.deleteUser(req, res);
})

router.put('/user', (req, res) => {
    return userController.updateUser(req, res);
})

router.post('/user/login', (req, res) => {
    return userController.loginUser(req, res);
})

export { router };