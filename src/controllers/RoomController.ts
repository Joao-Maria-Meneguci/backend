import type { Response, Request } from "express";
import type { CreateRoomService } from "../services/CreateRoomService/CreateRoomService";
import type { IRoom, IRoomUpdate } from "../models/types/IRoom";
import type { GetRoomService } from "../services/GetRoomService/GetRoomService";
import type { DeleteRoomService } from "../services/DeleteRoomService/DeleteRoomService";
import type { UpdateRoomService } from "../services/UpdateRoomService/UpdateRoomService";
import { GetAllRoomService } from "../services/GetAllRoomService/GetAllRoomService";

export class RoomController {
    constructor(private options: {
        createRoomService?: CreateRoomService,
        getRoomService?: GetRoomService,
        updateRoomService?: UpdateRoomService,
        deleteRoomService?: DeleteRoomService,
        getAllRoomService?: GetAllRoomService
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

    /**
     * Get a room by name via get method
     * 
     * @param {Request} req Express request
     * @param {Response} res Express response 
     * @returns {Promise<Response>} Express response
     */
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

    async getAllRooms(req: Request, res: Response): Promise<Response> {
        try {
            const rooms = await this.options.getAllRoomService!.execute();

            return res.status(200).json(rooms);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({error: error.message});
            }
            
            return res.status(500).send();
        }
    }

    async updateRoom(req: Request, res: Response): Promise<Response> {
        const {name, newName, description, singleBed, doubleBed, features, details}: IRoomUpdate = req.body;
        const data = {name, newName, description, singleBed, doubleBed, features, details};

        try {
            this.options.updateRoomService!.execute(data);

            return res.status(200).json({message: `Room ${name} updated with success!`});
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({error: error.message});
            }

            return res.status(500).send();
        } 
    }

    /**
     * Delete a room by name via delete method
     * 
     * @param {Request} req Express request
     * @param {Response} res Express response 
     * @returns {Promise<Response>} Express response
     */
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