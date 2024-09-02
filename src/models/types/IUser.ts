export interface  IUser {
    id?: string;
    name: string;
    email: string;
    cpf: string;
    rg: string;
    phone: string;
    password: string;
    isAdmin?: boolean;
}