import { orderService } from "./order.service";

export const orderController = {
    async create(request, reply){
        const { id } = request.user;
        const result = await orderService.create(id, request.body);

        return reply.status(201).send(
            result
        );
    },
    async findById(request, reply){
        const { id } = request.user;
        const { id: order_id } = request.params;
        const order = await orderService.findById(id, order_id);

        return reply.status(200).send(
            order
        );
    },
    async findAll(request, reply){
        const { id } = request.user;
        const orderList = await orderService.findAll(id);

        return reply.status(200).send(
            orderList
        );
    },
    async updateStatus(request, reply){
        const { id } = request.params;
        const { status } = request.body;

        await orderService.updateStatus(id, status);
        return reply.status(200).send({
            message: "Status atualizado!"
        });
    }
}