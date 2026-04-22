import { UnauthorizedError } from "../utils/errors.utils";

export async function verifyToken(request, reply){
    await request.jwtVerify();
}

export async function onlyAdmin(request, reply){
    await request.jwtVerify();

    if (request.user.perfil !== 'admin'){
        throw new UnauthorizedError('Acesso negado!');
    }
}