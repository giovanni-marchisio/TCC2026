import { productService } from "../services/product.service";

/** @typedef {import("fastify").FastifyRequest} Request */
/** @typedef {import("fastify").FastifyReply} Reply */

export const productController = {
    /** @param {Request} request @param {Reply} reply */
    async register(request, reply){
        const dados = request.body;

        const ret = await productService.register(dados);
        return reply.status(201).send(ret);
    },

    /** @param {Request} request @param {Reply} reply */
    async modify(request, reply){
        const { id } = request.params;
        const dados = request.body;

        const ret = await productService.modify(id, dados);
        return reply.status(200).send(ret);
    },
    /** @param {Request} request @param {Reply} reply */
    async delete(request, reply){
        const id = request.params.id;
        
        const ret = await productService.delete(id);
        return reply.status(200).send(ret);       
    },

    /** @param {Request} request @param {Reply} reply */
    async restore(request, reply){
        const id = request.params.id;

        const ret = await productService.restore(id);
        return reply.status(200).send(ret)
    },

    /** @param {Request} request @param {Reply} reply */
    async list(request, reply){

        const list = await productService.list();

        return reply.status(200).send(list);
    },

    /** @param {Request} request @param {Reply} reply */
    async listAll(request, reply){

        const list = await productService.listAll();

        return reply.status(200).send(list);
    }
}