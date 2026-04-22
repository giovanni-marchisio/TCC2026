export class NotFoundError extends Error {
    constructor(msg = 'Recurso não encontrado'){
        super(msg);
        this.name = "NotFoundError";
        this.statusCode = 404;
    }
}

export class ValidationError extends Error {
    constructor(msg = 'Dados inválidos'){
        super(msg);
        this.name = "ValidationError";
        this.statusCode = 400;
    }
}

export class UnauthorizedError extends Error {
    constructor(msg = 'Não autorizado'){
        super(msg);
        this.name = "UnauthorizedError";
        this.statusCode = 401;
    }
}

export class ForbiddenError extends Error {
    constructor(msg = 'Accesso negado'){
        super(msg);
        this.name = "ForbiddenError";
        this.statusCode = 403;
    }
}

export class ConflictError extends Error {
    constructor(msg = 'Recurso já existe'){
        super(msg);
        this.name = "ConflictError";
        this.statusCode = 409;
    }
}