import type { IReservation } from "./types/IReservation";

export class Reservations implements IReservation{
    user_id: string;
    room_id: string;
    start_date: Date;
    end_date: Date;
    created_at: Date;
    updated_at: Date;

    constructor(data: Omit<IReservation, 'id'>) {
        this.user_id = data.user_id;
        this.room_id = data.room_id;
        this.start_date = data.start_date;
        this.end_date = data.end_date;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }
}