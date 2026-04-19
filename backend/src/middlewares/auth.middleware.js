import { UnauthorizedError, ForbiddenError } from "../utils/errors";

export async function verifyToken(request, reply){
    await request.jwtVerify();
}

export async function onlyAdmin(request, reply){
    await request.jwtVerify();

    if (request.user.perfil !== 'admin'){
        throw new UnauthorizedError('Acesso negado!');
    }
}