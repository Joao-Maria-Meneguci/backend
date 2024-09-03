import { CustomError } from "../errors/CustomError"
import type { IUser, IUserUpdate } from "../models/types/IUser"
import type { CreateUserService } from "../services/Users/CreateUserService/CreateUserService"
import type { DeleteUserService } from "../services/Users/DeleteUserService/DeleteUserService"
import type { GetUserService } from "../services/Users/GetUserService/GetUserService"
import type { LoginUserService } from "../services/Users/LoginUserService/LoginUserService"
import type { UpdateUserService } from "../services/Users/UpdateUserService/UpdateUserService"
import type { Request, Response } from "express"

export class UserController {
    constructor (
        private options: {
            createUserService: CreateUserService
            getUserService: GetUserService
            loginUserService: LoginUserService
            deleteUserService: DeleteUserService
            updateUserService: UpdateUserService
        }
    ) {}

    async createUser(req: Request, res: Response): Promise<Response> {
        const { name, email, password, cpf, rg, phone} = req.body;
        const user: IUser = { name, email, password, cpf, rg, phone};

        try {
            if (Object.keys(user).some(value => value === null || value === undefined || value === '')) {
                return res.status(400).json({error: 'Missing required fields!'}); 
            }

            await this.options.createUserService.execute(user);
            return res.status(201).send();
        } catch (error) {
            if (error instanceof CustomError) {
                return res.status(error.code).json({error: error.message});
            }

            return res.status(500).send();
        }
    }

    async loginUser(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;
        try {
            if (!email || !password) {
                return res.status(400).json({error: 'Missing required fields!'}); 
            }
            
            const user = await this.options.getUserService!.execute(email);
            if (!user) {
                return res.status(404).json({error: 'User not found!'});
            }
            return res.status(200).json(user);
        } catch (error) {
            if (error instanceof CustomError) {
                return res.status(error.code).json({error: error.message});
            }

            return res.status(500).send();
        }
    }

    async getUser(req: Request, res: Response): Promise<Response> {
        const { email } = req.params;
        try {
            if (!email) {
                return res.status(400).json({error: 'Missing required fields!'}); 
            }

            const user = await this.options.getUserService!.execute(email);
            return res.status(200).json(user);
        } catch (error) {
            if (error instanceof CustomError) {
                return res.status(error.code).json({error: error.message});
            }
            return res.status(500).send();
        }
    }

    async deleteUser(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;
        try {
            if (!email || !password) {
                return res.status(400).json({error: 'Missing required fields!'}); 
            }
            
            await this.options.deleteUserService.execute(email, password);
            return res.status(200).send();
        } catch (error) {
            if (error instanceof CustomError) {
                return res.status(error.code).json({error: error.message});
            }

            return res.status(500).send();
        }
    }

    async updateUser(req: Request, res: Response): Promise<Response> {
        const { name, email, password, cpf, rg, phone, newEmail, newPhone} = req.body;
        const user: IUserUpdate = { name, email, password, cpf, rg, phone, newEmail, newPhone};
        try {
            if (Object.keys(user).some(value => value === null || value === undefined || value === '')) {
                return res.status(400).json({error: 'Missing required fields!'}); 
            }

            await this.options.updateUserService!.execute(user);
            return res.status(200).send();
        } catch (error) {
            if (error instanceof CustomError) {
                return res.status(error.code).json({error: error.message});
            }

            return res.status(500).send();
        }
    }
}