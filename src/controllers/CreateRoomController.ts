import type { Response, Request } from "express";
import type { CreateRoomService } from "../services/CreateRoomService/CreateRoomService";
import { IRoom } from "../models/types/IRoom";

export class CreateRoomController {
    constructor(
        private createRoomService: CreateRoomService
    ) {}

    /**
    * Create a new room via post method 
    * 
    * @param {Request} req Express request
    * @param {Response} res Express response 
    * @returns {Promise<Response>} Express response
    */
    async handle(req: Request, res: Response) {
        const { name, description, singleBed, doubleBed, features, details }: IRoom = req.body;

        try {
            await this.createRoomService.execute({name, description, singleBed, doubleBed, features, details });

            return res.status(201).send();
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({error: error.message});
            }

            return res.status(500).send();
        }
    }
}