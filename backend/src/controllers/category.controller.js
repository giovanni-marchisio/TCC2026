import { categoryService } from "../services/category.service";

/** @typedef {import("fastify").FastifyRequest} Request */
/** @typedef {import("fastify").FastifyReply} Reply */

export const categoryController = {
    /** @param {Request} request @param {Reply} reply */
    async register(request, reply){
        const dados = request.body;

        const { insertId, affectedRows } = await categoryService.register(dados);
        return reply.status(201).send(
            { message: 'Categoria registrada', id: insertId, affectedRows: affectedRows }
        );
    },

    /** @param {Request} request @param {Reply} reply */
    async modify(request, reply){
        const { id } = request.params;
        const dados = request.body;

        const { info } = await categoryService.modify(id, dados);
        return reply.status(200).send(
            { message: 'Produto modificado', id: id, info: info }
        );
    },

    /** @param {Request} request @param {Reply} reply */
    async delete(request, reply){
        const { id } = request.params;

        const { info } = await categoryService.delete(id);
        return reply.status(200).send(
            { message: 'Categoria deletada', id: id, info: info }
        );
    },

    /** @param {Request} request @param {Reply} reply */
    async restore(request, reply){
        const { id } = request.params;

        const { info } = await categoryService.delete(id);
        return reply.status(200).send(
            { message: 'Categoria restaurada', id: id, info: info}
        );
    },

    /** @param {Request} request @param {Reply} reply */
    async list(request, reply){

        const list = await categoryService.list();
        return reply.status(200).send(list);
    },

    /** @param {Request} request @param {Reply} reply */
    async listAll(request, reply){

        const ret = await categoryService.listAll();
        return reply.status(200).send(ret);
    },

}
