import type { IReservation, IReservationUpdate } from "../models/types/IReservation";

export interface IReservationRepository {
    findByUserName(name: string): Promise<IReservation[]>;
    findByRoomId(roomId: number): Promise<IReservation[]>;
    delete(id: number): Promise<void>;
    update(data: IReservationUpdate): Promise<void>;
    create(data: IReservation): Promise<void>;
}