export class HttpError extends Error {
    statusCode: number

    constructor(statusCode: number, message: string) {
        super(message)
        this.statusCode = statusCode
    }
}

export class ConflictError extends HttpError {
    constructor(message: string) {
        super(409, message)
    }
}
