import type { Room as PrismaRoom } from "@prisma/client";

export interface IRoom{
    id?: number;
    name: string;
    description: string;
    singleBed: number;
    doubleBed: number;
    features: {
        ac: boolean;
        tv: boolean;
        wifi: boolean;
        towels: boolean;
        minibar: boolean;
        kitchen: boolean;
        shower: boolean;
        bathtub: boolean;
    };
    details: {
        checkIn: string;
        checkOut: string;
        minimumStay: number;
    };
}