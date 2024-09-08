export interface IReservation {
    id?: string;
    user_id: number;
    room_id: number;
    start_date: Date;
    end_date: Date;
    created_at: Date;
    updated_at: Date;
}

export interface IReservationUpdate extends Omit<IReservation, 'id'> {
    newStartDate?: Date;
    newEndDate?: Date;
}