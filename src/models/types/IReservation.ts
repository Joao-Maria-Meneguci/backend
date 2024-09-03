export interface IReservation {
    id?: string;
    user_id: string;
    room_id: string;
    start_date: Date;
    end_date: Date;
    created_at: Date;
    updated_at: Date;
}