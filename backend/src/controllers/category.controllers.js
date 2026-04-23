import { categoryService } from "../services/category.service";

/** @typedef {import("fastify").FastifyRequest} Request */
/** @typedef {import("fastify").FastifyReply} Reply */

export const categoryController = {
    /** @param {Request} request @param {Reply} reply */
    async register(request, reply){
        const dados = request.body;

        const ret = await categoryService.register(dados);
        return reply.status(201).send(ret);
    },

    /** @param {Request} request @param {Reply} reply */
    async modify(request, reply){
        const { id } = request.params;
        const dados = request.body;

        const ret = await categoryService.modify(id, dados);
        return reply.status(200).send(ret);
    },

    /** @param {Request} request @param {Reply} reply */
    async delete(request, reply){
        const { id } = request.params;

        const ret = await categoryService.delete(id);
        return reply.status(200).send(ret);
    },

    /** @param {Request} request @param {Reply} reply */
    async restore(request, reply){
        const { id } = request.params;

        const ret = await categoryService.delete(id);
        return reply.status(200).send(ret);
    },

    /** @param {Request} request @param {Reply} reply */
    async list(request, reply){

        const ret = await categoryService.list();
        return reply.status(200).send(ret);
    },

    /** @param {Request} request @param {Reply} reply */
    async listAll(request, reply){

        const ret = await categoryService.listAll();
        return reply.status(200).send(ret);
    },

}
