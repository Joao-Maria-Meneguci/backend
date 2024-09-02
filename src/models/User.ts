import type { IUser } from "./types/IUser";

export class User implements IUser {
    name: string;
    cpf: string;
    rg: string;
    phone: string;
    email: string;
    password: string;

    constructor(props: IUser) {
        this.name = props.name;
        this.cpf = props.cpf;
        this.rg = props.rg;
        this.phone = props.phone;
        this.email = props.email;
        this.password = props.password;
    }
}
