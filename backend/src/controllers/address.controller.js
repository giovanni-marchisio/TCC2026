import { addressService } from "../services/address.service";

/** @typedef {import("fastify").FastifyRequest} Request */
/** @typedef {import("fastify").FastifyReply} Reply */

export const addressController = {
    /** @param {Request} request @param {Reply} reply */
    async register(request, reply){
        const { id } = request.user;
        const dados = request.body;

        const ret = await addressService.register(id, dados);
        return reply.status(201).send(ret);
    }        
}