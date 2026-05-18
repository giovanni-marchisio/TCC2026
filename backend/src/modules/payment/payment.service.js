import { PaymentRepository } from "./payment.repository";
import { OrderRepository } from "../order/order.repository";
import { UserRepository } from "../user/user.repository";

import { 
    ConflictError,
    ForbiddenError,
    NotFoundError, 
    ValidationError 
} from "../../utils/errors";

export const paymentService = {
    async findByOrderId(user_id, order_id){
        const client = await UserRepository.findClientByUserId(user_id);
        if (!client) throw new NotFoundError("Cliente não encontrado!");
        
        const order = await OrderRepository.findByOrderId(order_id);
        if (!order) throw new NotFoundError("Pedido não encontrado!");

        if (order.cliente_id !== client.id) throw new ForbiddenError("Acesso negado!");

        const payment = await PaymentRepository.findByOrderId(order_id);
        if (!payment) throw new NotFoundError("Pagamento não encontrado!");

        return payment;
    },
    async list(client_id, status){
        if (status) return PaymentRepository.findByStatus(status, client_id);
        return PaymentRepository.list(client_id);
    },
    async findAll(status){
        return PaymentRepository.findAll(status);
    },
    async updateStatus(order_id, status){
        const validStatus = ["pendente", "aprovado", "recusado", "estornado"];
        if (!validStatus.includes(status)) throw new ValidationError("Status desconhecido!");

        const payment = await PaymentRepository.findByOrderId(order_id);
        if (!payment) throw new NotFoundError("Pagamento não encontrado!");

        if (payment.status === status ) throw new ConflictError;

        await PaymentRepository.updateStatus(order_id, status);
        
        if (status === "aprovado") {
            await OrderRepository.updateStatus(order_id, "pago");
            //
        }

        if (status === "estornado") {
            await OrderRepository.updateStatus(order_id, "cancelado");
            //
        }
    }
};