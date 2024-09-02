export class CustomError extends Error {
    public message: string;
    public code: number;

    constructor(code: number, message: string) {
        super(message);

        this.message = message;
        this.code = code;
    }
}