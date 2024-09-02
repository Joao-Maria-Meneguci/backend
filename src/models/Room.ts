import { uuid } from "uuidv4";
import { IRoom } from "./types/IRoom";
import { Room as PrsimaRoom } from '@prisma/client'

export class Room implements IRoom {
    id?: number | undefined;
    name: string;
    description: string;
    singleBed: number;
    doubleBed: number;
    features: IRoom['features'];
    details: IRoom['details'];

    constructor(props: IRoom) {
        this.name = props.name;
        this.description = props.description;
        this.singleBed = props.singleBed;
        this.doubleBed = props.doubleBed;
        this.features = props.features;
        this.details = props.details;        
    }
}
