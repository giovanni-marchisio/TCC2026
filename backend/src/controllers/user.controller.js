import { userService } from "../services/user.service";

/** @typedef {import("fastify").FastifyRequest} Request */
/** @typedef {import("fastify").FastifyReply} Reply */

const userController = {

    /** @param {Request} request @param {Reply} reply */
    async register(request, reply){
        const dados = request.body;

        await userService.register(dados);
        return reply.status(201).send();
    },
    
    /** @param {Request} request @param {Reply} reply */
    async login(request, reply){
        const user = await userService.login(request.body);

        const token = await reply.jwtSign(
            { id: user.id, perfil: user.perfil },
            { expiresIn: '1d' }
        )

        return reply.status(200).send({token, nome: user.nome});
    },

    /** @param {Request} request @param {Reply} reply */
    async delete(request, reply){
        const id = request.params.id;

        await userService.delete(id);
        return reply.status(200).send();
    },

    /** @param {Request} request @param {Reply} reply */
    async restore(request, reply){
        const id = request.params.id;

        await userService.restore(id);
        return reply.status(200).send();
    }
}

export { userController };