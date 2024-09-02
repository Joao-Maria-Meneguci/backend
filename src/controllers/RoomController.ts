import type { Response, Request } from "express";
import type { CreateRoomService } from "../services/CreateRoomService/CreateRoomService";
import type { IRoom } from "../models/types/IRoom";
import type { GetRoomService } from "../services/GetRoomService/GetRoomService";
import { DeleteRoomService } from "../services/DeleteRoomService/DeleteRoomService";

export class RoomController {
    constructor(private options: {
        createRoomService?: CreateRoomService,
        getRoomService?: GetRoomService,
        deleteRoomService?: DeleteRoomService
        }
    ) {}

    /**
    * Create a new room via post method 
    * 
    * @param {Request} req Express request
    * @param {Response} res Express response 
    * @returns {Promise<Response>} Express response
    */
    async createRoom(req: Request, res: Response): Promise<Response> {
        const { name, description, singleBed, doubleBed, features, details }: IRoom = req.body;

        try {
            await this.options.createRoomService!.execute({name, description, singleBed, doubleBed, features, details });

            return res.status(201).send();
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({error: error.message});
            }

            return res.status(500).send();
        }
    }

    async getRoomByName(req: Request, res: Response): Promise<Response> {
        const { name } = req.params;

        try {
            const room = await this.options.getRoomService!.execute(name);

            return res.status(200).json(room);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({error: error.message});
            }

            return res.status(500).send();  
        }
    }

    async deleteRoom(req: Request, res: Response): Promise<Response> {
        const { name, confirmName } = req.body;

        if (name !== confirmName) {
            return res.status(400).json({error: 'Names do not match!'});
        }

        try {
            const room = await this.options.deleteRoomService!.execute(name);

            return res.status(200).json({message: `Room ${name} deleted with success!`});            
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({error: err.message});
            }

            return res.status(500).send();
        }
    }
}