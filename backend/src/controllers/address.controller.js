import { addressService } from "../services/address.service";

/** @typedef {import("fastify").FastifyRequest} Request */
/** @typedef {import("fastify").FastifyReply} Reply */

export const addressController = {
    /** @param {Request} request @param {Reply} reply */
    async register(request, reply){
        const { id } = request.user;
        const dados = request.body;

        const { affectedRows, insertId } = await addressService.register(id, dados);
        return reply.status(201).send(
            { message: 'Endereço registrado', id: insertId, user: id, affectedRows: affectedRows}
        );
    },

    /** @param {Request} request @param {Reply} reply */    
    async modify(request, reply){
        const { id: user_id } = request.user;
        const { id } = request.params;
        const dados = request.body;

        const { info } = await addressService.modify(user_id, id, dados);
        return reply.status(200).send(
            { message: 'Endereço modifiado', id: id, user: user_id, info: info }
        );
    }
}