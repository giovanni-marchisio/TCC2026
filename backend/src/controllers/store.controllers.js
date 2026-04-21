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
    async modify(request, reply){
        const dados = request.body;

        await storeService.modify(dados);
        return reply.status(200).send({
            message: "Produto modificado com sucesso!"
        });
    },

    /** @param {Request} request @param {Reply} reply */
    async modifyCategory(request, reply){
        const dados = request.body;

        await storeService.modifyCategory(dados);
        return reply.status(200).send({
            message: "Categoria modificada com sucesso!"
        });
    },

    /** @param {Request} request @param {Reply} reply */
    async registerCategory(request, reply){
        const dados = request.body;

        await storeService.registerCategory(dados);
        return reply.status(201).send({
            message: "Categoria registrada com sucesso!"
        });
    },

    /** @param {Request} request @param {Reply} reply */
    async delete(request, reply){
        const id = request.params.id;
        
        await storeService.delete(id);
        return reply.status(200).send({
            message: "Produto removido!"
        });       
    },

    /** @param {Request} request @param {Reply} reply */
    async restore(request, reply){
        const id = request.params.id;

        await storeService.restore(id);
        return reply.status(200).send({
            message: ""
        })
    },

    /** @param {Request} request @param {Reply} reply */
    async listAll(request, reply){

        const list = await storeService.listAll();

        return reply.status(200).send(list);
    }
}

export { storeController };