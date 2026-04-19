import { storeService } from "../services/store.service";

/** @typedef {import("fastify").FastifyRequest} Request */
/** @typedef {import("fastify").FastifyReply} Reply */

const storeController = {
    /** @param {Request} request @param {Reply} reply */
    async register(request, reply){
        const dados = request.body;

        await storeService.register(dados);
        return reply.status(201).send({
            message: "Produto registrado com sucesso!"
        });
    },

    /** @param {Request} request @param {Reply} reply */
    async registerCategory(request, reply){
        const dados = request.body;

        await storeService.registerCategory(dados);
        return reply.status(201).send({
            message: "Categoria registrada com sucesso!"
        });
    }
}

export { storeController };