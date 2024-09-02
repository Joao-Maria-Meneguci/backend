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

export interface IRoomUpdate extends IRoom{
    newName?: string;
}