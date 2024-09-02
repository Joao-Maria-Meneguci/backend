import { PrismaClient } from "@prisma/client";
import { CustomError } from "../../errors/CustomError";
import type { User } from "../../models/User";
import { IUserUpdate } from "../../models/types/IUser";
import { where } from "@tensorflow/tfjs";

export class PostgresUserRepository {

    async findByEmail(email: string): Promise<User | undefined> {
        const prisma = new PrismaClient();
        const user = await prisma.user.findFirst({where: {email}});

        if (!user) {
            prisma.$disconnect();
            throw new CustomError(404, "User not found");
        }


        prisma.$disconnect();
        return user;
    }

    async save(user: User): Promise<void> {
        const prisma = new PrismaClient();
        const userAlreadyExists = await prisma.user.findFirst({where: {email: user.email}});

        const fieldsToCheck = ['cpf', 'rg', 'phone', 'email'] as Array<keyof User>;

        
        if (fieldsToCheck.some(field => userAlreadyExists?.[field] === user[field])) {
            prisma.$disconnect();
            throw new CustomError(409, "User already exists");
        }

        await prisma.user.create({ data: user });
        prisma.$disconnect();
    }

    async delete(email: string, password: string): Promise<void> {
        const prisma = new PrismaClient();

        const userExists = await prisma.user.findFirst({where: {email, password}});

        if (!userExists) {
            prisma.$disconnect();
            throw new CustomError(404, "User not found");
        }

        await prisma.user.delete({ where: { email } });
        prisma.$disconnect();
        return ;
    }

    async update(email: string, data: Partial<IUserUpdate>): Promise<void> {
        const prisma = new PrismaClient();
        const userExists = await prisma.user.findFirst({where: {email}});

        if (!userExists) {
            prisma.$disconnect();
            throw new CustomError(404, "User not found");
        }

        const {newEmail, newPhone, ...dataToUpdate} = data;

        await prisma.user.update({ 
            where: { email }, 
            data: { ...dataToUpdate, ...(newEmail && {email: newEmail}), ...(newPhone && {phone: newPhone})}
        });


        prisma.$disconnect();
    }
}