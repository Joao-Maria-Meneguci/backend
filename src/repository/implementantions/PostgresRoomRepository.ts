import { CustomError } from "../../errors/CustomError";
import { Room } from "../../models/Room";
import type { IRoom } from "../../models/types/IRoom";
import { PrismaClient, Prisma } from "@prisma/client";

export class PostgresRoomRepository {
    async findByName(name: string): Promise<IRoom | undefined> {
        const prisma = new PrismaClient();

        const room = await prisma.room.findFirst({where: {name}})

        if (!room) {
            prisma.$disconnect();
            return;
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