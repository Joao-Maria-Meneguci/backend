import { Room } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

export class PostgresRoomRepository {
    async findByName(name: string) {
        const prisma = new PrismaClient();

        const room = await prisma.room.findFirst({where: {name}})

        if (room) {
            throw new Error('exists');
        }

        prisma.$disconnect();
        return room;
    }

    async save(room: Room) {
        const prisma = new PrismaClient();
        const { id, name, description, features, details } = room;

        await prisma.room.create({
            data: {
                id,
                name,
                description,
                features,
                details,
            },
        });
    }
}