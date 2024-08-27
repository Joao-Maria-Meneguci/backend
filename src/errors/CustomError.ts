export class CustomError extends Error {
    public message: string;
    public code: number | string;

    constructor(code: number | string, message: string) {
        super(message);

        this.message = message;
        this.code = code;
    }
}