import { categoryService } from "../services/category.service";

/** @typedef {import("fastify").FastifyRequest} Request */
/** @typedef {import("fastify").FastifyReply} Reply */

export const categoryController = {
    /** @param {Request} request @param {Reply} reply */
    async modify(request, reply){
        const { id } = request.params;
        const dados = request.body;

        const ret = await categoryService.modifyCategory(id, dados);
        return reply.status(200).send(ret);
    },

    /** @param {Request} request @param {Reply} reply */
    async register(request, reply){
        const dados = request.body;

        const ret = await categoryService.register(dados);
        return reply.status(201).send(ret);
    },

}
