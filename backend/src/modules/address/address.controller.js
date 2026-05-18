import { addressService } from "./address.service";

export const addressController = {
    async register(request, reply){
        const { client_id, id } = request.user;
        const data = request.body;
        const { 
            id: addressId, 
            affectedRows 
            } = await addressService.register(id, client_id, data);

        return reply.status(201).send({
            message: "Endereço registrado!",
            id: addressId,
            affectedRows: affectedRows
        });
    },
    async delete(request, reply){
        const { client_id } = request.user;
        const { id } = request.params;
        const { affectedRows } = await addressService.delete(client_id, id);

        return reply.status(200).send({
            message: "Endereço deletado!",
            id: id,
            affectedRows: affectedRows
        });
    },
    async restore(request, reply){
        const { client_id } = request.user;
        const { id } = request.params;
        const { affectedRows } = await addressService.restore(client_id, id);

        return reply.status(200).send({
            message: "Endereço restaurado!",
            id: id,
            affectedRows: affectedRows
        });
    },
    async modify(request, reply){
        const { client_id } = request.user;
        const { id } = request.params;
        const data = request.body;
        const { affectedRows } = await addressService.modify(client_id, id, data);

        return reply.status(200).send({
            message: "Informações atualizadas",
            id: id,
            affectedRows: affectedRows
        });
    },
    async list(request, reply){
        const { client_id } = request.user;

        const list = await addressService.list(client_id);

        return reply.status(200).send(
            list
        )
    },
    async setMain(request, reply){
        const { client_id } = request.user;
        const { id } = request.params;
        const { affectedRows } = await addressService.setMain(client_id, id);

        return reply.status(200).send({
            message: "Mudança feita com sucesso!",
            affectedRows: affectedRows
        });
    },
    async findById(request, reply){
        const { client_id } = request.user;
        const { id } = request.params;
        const response = await addressService.findById(client_id, id);

        return reply.status(200).send(
            response
        );
    },
/*     async searchById(request, reply){
        const { userId: id } = request.params;
        // Vou pensar ainda em como implementar uma função pro adm achar o endereço de X usuário
    } */
}