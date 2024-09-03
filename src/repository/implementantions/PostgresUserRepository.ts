import type { User } from "../../models/User";
import type { IUserUpdate } from "../../models/types/IUser";
import { PrismaClient } from "@prisma/client";
import { CustomError } from "../../errors/CustomError";
import { hash, compare } from 'bcrypt';

export class PostgresUserRepository {

    async getUser(email: string): Promise<Partial<User> | undefined> {
        const prisma = new PrismaClient();
        const user = await prisma.user.findFirst({where: {email}, select: {name: true, cpf: true, rg: true, phone: true, email: true, password: false}});

        if (!user) {
            prisma.$disconnect();
            throw new CustomError(404, "User not found");
        }


        prisma.$disconnect();
        return user;
    }

    async loginUser(email: string, password: string): Promise<true | undefined> {
        const prisma = new PrismaClient();

        const user = await prisma.user.findFirst({where: {email}, select: {password: true}});
        
        if (!user) {
            prisma.$disconnect();
            throw new CustomError(404, "User not found");
        }

        if (!await compare( password, user.password || '')) {
            prisma.$disconnect();
            throw new CustomError(401, "Invalid password");
        }

        prisma.$disconnect();
        return true;
    }

    async save(user: User): Promise<void> {
        const prisma = new PrismaClient();
        const userAlreadyExists = await prisma.user.findFirst(
            {
                where: {email: user.email}, 
                select: {name: false, cpf: true, rg: true, phone: true, email: true, password: false}
            }) as Pick<User ,'cpf' | 'rg' | 'phone' | 'email'>;

        

        const fieldsToCheck: Array<keyof Pick<User ,'cpf' | 'rg' | 'phone' | 'email'>> = ['cpf', 'rg', 'phone', 'email'];
        
        if (userAlreadyExists && fieldsToCheck.some(field => userAlreadyExists?.[field] === user[field])) {
            prisma.$disconnect();
            throw new CustomError(409, "User already exists");
        }

        user.password = await hash(user.password, 10);

        await prisma.user.create({ data: user });
        prisma.$disconnect();
        return;
    }

    async delete(email: string, password: string): Promise<void> {
        const prisma = new PrismaClient();

        const userExists = await prisma.user.findFirst({where: {email}});

        if (!userExists) {
            prisma.$disconnect();
            throw new CustomError(404, "User not found");
        }

        const isPassCorrect = await compare(password, userExists.password);
        if (!isPassCorrect) {
            prisma.$disconnect();
            throw new CustomError(401, "Invalid password");
        }

        await prisma.user.delete({ where: { email } });
        prisma.$disconnect();
        return ;
    }

    async update(email: string, data: Partial<IUserUpdate>): Promise<void> {
        const prisma = new PrismaClient();

        if (!await prisma.user.findFirst({where: {email}})) {
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