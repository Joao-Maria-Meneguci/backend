import { CustomError } from "../../errors/CustomError";
import type { Room } from "../../models/Room";
import type { IRoom, IRoomUpdate } from "../../models/types/IRoom";
import { PrismaClient, Prisma } from "@prisma/client";

export class PostgresRoomRepository {
    async findByName(name: string): Promise<IRoom | undefined> {
        const prisma = new PrismaClient();

        const room = await prisma.room.findFirst({where: {name}})

        if (!room) {
            prisma.$disconnect();
            throw new CustomError(404, "Room not found");
        }

        const mappedRoom: IRoom = {
            id: room.id,
            name: room.name,
            description: room.description,
            singleBed: room.singleBed,
            doubleBed: room.doubleBed,
            features: room.features as IRoom['features'],
            details: room.details as IRoom['details']
        };

        prisma.$disconnect();
        return mappedRoom;
    }

    async findAll(): Promise<IRoom[]> {
        const prisma = new PrismaClient();
        const rooms = await prisma.room.findMany();

        if (!rooms) {
            prisma.$disconnect();
            throw new CustomError(404, "Rooms not found");
        }

        const mappedRooms = rooms.map((room) => {
            return {
                id: room.id,
                name: room.name,
                description: room.description,
                singleBed: room.singleBed,
                doubleBed: room.doubleBed,
                features: room.features as IRoom['features'],
                details: room.details as IRoom['details']
            };
        });

        prisma.$disconnect();
        return mappedRooms;
    }

    async delete(name: string): Promise<void> {
        const prisma = new PrismaClient();
        await prisma.room.delete({ where: { name } });

        prisma.$disconnect();
        return;
    }

    async update(name: IRoomUpdate['name'], data: Partial<IRoomUpdate>): Promise<void> {
        const prisma = new PrismaClient();
        const room = await this.findByName(name);
        
        if (!room) throw new CustomError(404, "Room not found");

        const {newName, ...dataToUpdate} = data; 

        await prisma.room.update({
            where: { name },
            data: { ...dataToUpdate, ...(newName && {name: newName}) },
        })

    }

    async save(room: Room) {
        const prisma = new PrismaClient();
        const { id, name, description, features, singleBed, doubleBed,  details } = room;

        await prisma.room.create({
            data: {
                id,
                name,
                description,
                singleBed,
                doubleBed,
                features: features || features as Prisma.InputJsonValue,
                details: details || details as Prisma.InputJsonValue,
            },
        });
    }
}