import { database } from "../../configs/database";

class OrderRepositoryClass {
    async create(client_id, address_id, total, db){
        const [result] = await db.raw(
            `INSERT INTO pedido 
            (
                cliente_id,
                endereco_id,
                status,
                valor_total
            ) VALUES(?, ?, 'pendente', ?)`,
             [client_id, address_id, total]
        );

        return result;
    };
    async createItem(order_id, product_id, quantity, subtotal, price_unit, db){
        await db.raw(
            `INSERT INTO pedido_produto 
            (
                pedido_id,
                produto_id,
                preco_unit,
                quantidade,
                subtotal
            ) VALUES (?, ?, ?, ?, ?)`,
             [order_id, product_id, price_unit, quantity, subtotal ]
        )
    };
    async findById(id){
        const [orderInfo] = await database.raw(
            `SELECT
                pedido.*,
                cliente.nome AS cliente,
                endereco.logradouro,
                endereco.numero,
                endereco.cidade,
                endereco.uf,
                endereco.cep
             FROM pedido
             JOIN cliente ON cliente.id = pedido.cliente_id
             JOIN endereco ON endereco.id = pedido.endereco_id
             WHERE pedido.id = ?`,
            [id]
        );

        return orderInfo[0];
    };
    async findItems(order_id){
        const [list] = await database.raw(
            `SELECT
                pedido_produto.*,
                produto.nome AS produto,
                produto.imagem
             FROM pedido_produto
             JOIN produto ON produto.id = pedido_produto.produto_id
             WHERE pedido_produto.pedido_id = ?`,
            [order_id]
        );

        return list
    };
    async findByClientId(client_id){
        const [list] = await database.raw(
            `SELECT * FROM pedido
             WHERE cliente_id = ?
             ORDER BY data_pedido DESC`,
            [client_id]
        );

        return list;
    };
    async updateStatus(order_id, status){
        const [result] = await database.raw(
            `UPDATE pedido SET
                status = ?
             WHERE id = ?`,
            [status, order_id]
        );

        return result;
    };
};

export const OrderRepository = new OrderRepositoryClass();

