import { userService } from "../services/user.service";

/** @typedef {import("fastify").FastifyRequest} Request */
/** @typedef {import("fastify").FastifyReply} Reply */

export const userController = {

    /** @param {Request} request @param {Reply} reply */
    async register(request, reply){
        const dados = request.body;

        await userService.register(dados);
        return reply.status(201).send({
            message: "Registrado com sucesso!"
        });
    },
    
    /** @param {Request} request @param {Reply} reply */
    async login(request, reply){
        const user = await userService.login(request.body);

        const token = await reply.jwtSign(
            { id: user.id, perfil: user.perfil },
            { expiresIn: '1d' }
        )

        return reply.status(200).send({
            token, 
            nome: user.nome, 
            id: user.id
        });
    },

    // Controllers para contas ADM (eu deveria separar dos usuários, mas tenho preguiça)
    /** @param {Request} request @param {Reply} reply */
    async delete(request, reply){
        const id = request.params.id;

        await userService.delete(id);
        return reply.status(200).send({
            message: "Usuário desativado!"
        });
    },

    /** @param {Request} request @param {Reply} reply */
    async restore(request, reply){
        const id = request.params.id;

        await userService.restore(id);
        return reply.status(200).send({
            message: "Usuário reativado!"
        });
    },

    /** @param {Request} request @param {Reply} reply */
    async listAll(request, reply){
        const list = await userService.listAll();
        console.log(list);
        return reply.status(200).send(list);
    }
}
