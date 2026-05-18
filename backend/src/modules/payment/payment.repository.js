import { database } from "../../configs/database";

class PaymentRepositoryClass {
    async create(order_id, payment_method, value, db){
        const [result] = await db.raw(
            `INSERT INTO pagamento 
            (
                pedido_id,
                metodo,
                status,
                valor
            ) VALUES (?, ?, 'pendente', ?)`,
             [order_id, payment_method, value]
        );

        return result;
    };
    async findOrderById(order_id){
        const [payment] = await database.raw(
            `SELECT * FROM pagamento
             WHERE pedido_id = ?`,
             [order_id]
        );

        return payment[0];
    };
    async findAll(status){
        if (status) {
            const [listStatus] = await database.raw(
             `SELECT
                pagamento.*,
                pedido.status AS status_pedido,
                pedido.valor_total,
                cliente.nome AS cliente
             FROM pagamento
             JOIN pedido ON pedido.id = pagamento.pedido_id
             JOIN cliente ON cliente.id = pedido.cliente_id
             WHERE pedido.status = ?
             ORDER BY pagamento.id DESC`,
             [status]
            );

            return listStatus;
        }

        const [list] = await database.raw(
            `SELECT
                pagamento.*,
                pedido.status AS status_pedido,
                pedido.valor_total,
                cliente.nome AS cliente
             FROM pagamento
             JOIN pedido ON pedido.id = pagamento.pedido_id
             JOIN cliente ON cliente.id = pedido.cliente_id
             ORDER BY pagamento.id DESC`
        );

        return list;
    };
    async findByStatus(status, client_id){
        const [list] = await database.raw(
            `SELECT
                pagamento.*,
                pedido.status AS status_pedido,
                pedido.valor_total,
                cliente.nome AS Cliente,
             FROM pagamento
             JOIN pedido ON pedido.id = pagamento.pedido_id
             JOIN cliente ON cliente.id = pedido.cliente_id
             WHERE pagamento.status = ? AND cliente.id = ?
             ORDER BY pagamento.id DESC`,
             [status, client_id]
        );

        return list;
    };
    async list(client_id){
        const [list] = await database.raw(
            `SELECT
                pagamento.*,
                pedido.status AS status_pedido,
                pedido.valor_total,
                cliente.nome AS cliente
             FROM pagamento
             JOIN pedido ON pedido.id = pagamento.pedido_id
             JOIN cliente ON cliente.id = pedido.cliente_id
             WHERE cliente.id = ?
             ORDER BY pagamento.id DESC`,
             [client_id]
        );

        return list;
    }; 
    async updateStatus(order_id, status){
        const [result] = await database.raw(
            `UPDATE pagamento SET
             status = ?,
             pago_em = CASE WHEN ? = 'aprovado' THEN NOW() ELSE NULL END
             WHERE pedido_id = ?`,
             [status, status, order_id]
        );
        
        return result;
    };
};

export const PaymentRepository = new PaymentRepositoryClass();