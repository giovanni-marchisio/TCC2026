import { paymentService } from "./payment.service";

export const paymentController = {
    async findByOrderId(request, reply){
        const { id } = request.user;
        const { order_id } = request.params;
        const payment = await paymentService.findByOrderId(id, order_id);

        return reply.status(200).send(
            payment
        )
    },
    async list(request, reply){
        const { client_id } = request.user;
        const { status } = request.query;
        const payments = await paymentService.list(client_id, status);

        return reply.status(200).send(
            payments
        )
    },
    async findAll(request, reply){
        const { status } = request.query;
        const payments = await paymentService.findAll(status);

        return reply.status(200).send(
            payments
        )
    },
    async updateStatus(request, reply){
        const { order_id } = request.params;
        const { status } = request.body;

        await paymentService.updateStatus(order_id, status);
        return reply.status(200).send({
            message: "Status do pagamento atualizado!"
        });
    },
};