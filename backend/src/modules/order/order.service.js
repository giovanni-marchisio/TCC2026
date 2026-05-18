import { database } from "../../configs/database";
import { OrderRepository } from "./order.repository";
import { PaymentRepository } from "../payment/payment.repository";
import { ProductRepository } from "../product/product.repository";
import { UserRepository } from "../user/user.repository";

import { 
    ForbiddenError,
    NotFoundError, 
    ValidationError 
} from "../../utils/errors";

export const orderService = {
    async create(user_id, data){
        const {
            address_id,
            items,
            payment_method
        } = data;

        const client = await UserRepository.findClientByUserId(user_id);
        if (!client) throw new NotFoundError("Cliente não encontrado!");

        let total = 0;
        const validProducts = [];

        for (const item of items) {
            const product = await ProductRepository.findById(item.product_id);
            if (!product) throw new NotFoundError(`Produto ${item.product_id} não encontrado!`);
            if (!product.ativo) throw new ValidationError(`Produto indisponível: ${product.nome}`);
            if (product.estoque < item.quantity) throw new ValidationError(`Estoque insuficiente: ${product.nome}`);

            total += product.preco * item.quantity;
            validProducts.push({...item, product});
        };

        return database.transaction(async (db) => {
            const orderResult = await OrderRepository.create(client.id, address_id, total, db);
            const orderId = orderResult.insertId;

            for (const item of validProducts){
                const subtotal = item.quantity * item.product.preco;

                await OrderRepository.createItem(
                    orderId,
                    item.product_id,
                    item.product.preco,
                    item.quantity,
                    subtotal,
                    db
                );

                const newStock = item.product.estoque - item.quantity;
                
                await ProductRepository.updateStock(item.product_id, newStock, db);

                if (newStock === 0){
                    await ProductRepository.delete(item.product_id, db);
                };
            };
            await PaymentRepository.create(orderId, payment_method, total, db);
            // não quero ficar enviando email pra mim
            // await emailService.sendOrderConfirmation(user_id, orderId, total);

            return { orderId, total };
        });
    },
    async findById(user_id, order_id){
        const client = await UserRepository.findClientByUserId(user_id);
        if (!client) throw new NotFoundError("Cliente não encontrado!");

        const order = await OrderRepository.findById(order_id);
        if (!order) throw new NotFoundError("Pedido não encontrado!");
        if (order.cliente_id !== client.id) throw new ForbiddenError("Acesso negado!");

        const items = await OrderRepository.findItems(order_id);

        return { ...order, items };
    },
    async findAll(user_id){
        const client = await UserRepository.findClientByUserId(user_id);
        if (!client) throw new NotFoundError("Cliente não encontrado!");

        return OrderRepository.findByClientId(client.id);
    },
    async updateStatus(order_id, status){
        const validStatus = ["pago", "enviado", "entregue", "cancelado", "pendente"];
        const order = await OrderRepository.findById(order_id);
        if (!order) throw new NotFoundError("Pedido não encontrado");
        if (!validStatus.includes(status)) throw new ValidationError("Status desconhecido!");

        return OrderRepository.updateStatus(order_id, status);
    }
};