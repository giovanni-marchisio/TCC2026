import { productService } from "../services/product.service";

/** @typedef {import("fastify").FastifyRequest} Request */
/** @typedef {import("fastify").FastifyReply} Reply */

export const productController = {
    /** @param {Request} request @param {Reply} reply */
    async register(request, reply){
        const dados = request.body;

        const { id, affectedRows, info } = await productService.register(dados);
        return reply.status(201).send(
            { message: 'Produto registrado', id: id, affectedRows: affectedRows }
        );
    },

    /** @param {Request} request @param {Reply} reply */
    async modify(request, reply){
        const { id } = request.params;
        const dados = request.body;

        const { info }= await productService.modify(id, dados);
        return reply.status(200).send(
            { message: 'Produto modificado', id: id, info: info }
        );
    },
    /** @param {Request} request @param {Reply} reply */
    async delete(request, reply){
        const id = request.params.id;
        
        const { info } = await productService.delete(id);
        return reply.status(200).send(
            { message: 'Produto deletado', id: id, info: info }
        );       
    },

    /** @param {Request} request @param {Reply} reply */
    async restore(request, reply){
        const id = request.params.id;

        const { info } = await productService.restore(id);
        return reply.status(200).send(
            { message: 'Produto restaurado', id: id, info: info }
        )
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