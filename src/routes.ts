import { Router } from "express";
import { createRoomController } from "./services/CreateRoomService";

const router = Router();

router.post('/room', (req, res) => {
    return createRoomController.handle(req, res);
})

export { router };