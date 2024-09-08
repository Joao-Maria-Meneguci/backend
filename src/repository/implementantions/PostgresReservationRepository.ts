import { PrismaClient } from "@prisma/client";
import { IReservation } from "../../models/types/IReservation";
import { CustomError } from "../../errors/CustomError";

export class PostgresReservationRepository {
    async save(data: IReservation) {
        const prisma = new PrismaClient();

        const { user_id, room_id, start_date, end_date }: IReservation = data;

        const conflictedReservations = await prisma.reservation.findMany({
            where: {
                roomId: room_id,

                OR: [{
                    startsAt: {
                        gte: start_date,
                    },
                    endsAt: {
                        lte: start_date
                    }
                }]
            }
        });

        if (conflictedReservations.length > 0) {
            prisma.$disconnect();
            throw new CustomError(409, "Room is not available");
        }

        await prisma.reservation.create({
            data: {
                userId: user_id,
                roomId: room_id,
                startsAt: start_date,
                endsAt: end_date,
                updatedAt: new Date(),
            }
        });
    }
}
