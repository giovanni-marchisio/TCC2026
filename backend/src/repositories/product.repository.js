import { database } from "../configs/database";

export const productRepository = {
    async register(dados) {

        const {
            imagem,
            nome,
            descricao,
            preco,
            categoria,
            estoque
        } = dados;

        await database.raw(
            `INSERT INTO produto (imagem, nome, descricao, preco, categoria_id, estoque)
            VALUES(?, ?, ?, ?, ?, ?)`,
            [imagem, nome, descricao, preco, categoria, estoque]
        );

        return { message: 'Produto registrado'};
    },

    async modify(id, dados){

        const {
            imagem,
            nome,
            descricao,
            preco,
            categoria,
            estoque
        } = dados;

        await database.raw(
            `UPDATE produto SET
            imagem = ?,
            nome = ?,
            descricao = ?,
            preco = ?,
            categoria_id = ?,
            estoque = ?
            WHERE id = ?`,
            [imagem, nome,descricao, preco, categoria, estoque, id]
        );

        return { message: 'Produto modificado' };

    },
    async list(){
        const [list] = await database.raw(
            `SELECT
                produto.nome,
                produto.imagem,
                produto.descricao,
                produto.preco,
                categoria.nome as categoria,
                produto.estoque
            FROM produto
            INNER JOIN categoria ON categoria.id = produto.categoria_id
            WHERE produto.ativo = TRUE AND categoria.ativo = TRUE`
        );

        return list;
    },

    async listAll(){
        const [list] = await database.raw(
            `SELECT
                produto.nome,
                produto.imagem,
                produto.descricao,
                produto.preco,
                categoria.nome as categoria,
                produto.estoque,
                produto.ativo
            FROM produto
            INNER JOIN categoria ON categoria.id = produto.categoria_id`
        );

        return list;
    },

    async delete(id) {
        await database.raw(
            `UPDATE produto SET ativo = FALSE WHERE id = ?`,
            [id]
        );

        return { message: 'Produto deletado' };
    },

    async restore(id){
        await database.raw(
            `UPDATE produto SET ativo = TRUE WHERE id = ?`,
            [id]
        );

        return { message: 'Produto reativado' };
    },

    async existsById(id){
        const [product] = await database.raw(
            `SELECT COUNT(*) as qtd FROM produto WHERE id = ?`,
            [id]
        );

        return product[0];
    },

    async existsByName(name){
        const [product] = await database.raw(
            'SELECT COUNT(*) as qtd FROM produto WHERE nome = ?',
            [name]
        );

        return product[0];
    }
}
