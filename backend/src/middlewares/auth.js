import { UnauthorizedError } from "../utils/errors";

export async function authenticate(request, reply){
    await request.jwtVerify();
};

export async function autorize(request, reply){
    await request.jwtVerify();

    const currentDate = new Date();

    if (request.user.type !== "admin"){
        throw new UnauthorizedError("Erro interno");
        console.log(
            `Tentativa de login:\n
                \tID: ${request.user.id}\n
                \tData: ${currentDate}`);
    };
};