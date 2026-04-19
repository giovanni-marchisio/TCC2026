import { database } from "../configs/database";

const StoreRepository = {

    async register(dados) {

        const {
            imagem,
            nome,
            descricao,
            preco,
            categoria,
            estoque
        } = dados;

        const product = await database.raw(
            `INSERT INTO produto (imagem, nome, descricao, preco, categoria_id, estoque)
            VALUES(?, ?, ?, ?, ?, ?)`,
            [imagem, nome, descricao, preco, categoria, estoque]
        );

        return product;
    },
    // Vou modificar depois a tabela da categoria para poder excluir ela sem deletar.
    async registerCategory(dados){
        const {
            nome,
            imagem
        } = dados;

        const category = await database.raw(
            `INSERT INTO categoria (nome, imagem)
            VALUES(?, ?)`,
            [nome, imagem]
        );

        return category;
    },

    async listAll(){
        const [list] = await database.raw(
            `SELECT
                produto.nome,
                produto.imagem,
                produto.descricao,
                produto.preco,
                categoria.nome,
                produto.estoque
            FROM categoria
            INNER JOIN produto ON produto.categoria_id = categoria.id`
        );

        return list;
    },

    async delete(id) {
        const [product] = await database.raw(
            `UPDATE produto SET ativo = FALSE WHERE id = ?`,
            [id]
        );

        return product;
    },

    async restore(id){
        const [product] = await database.raw(
            `UPDATE produto SET ativo = TRUE WHERE id = ?`,
            [id]
        );

        return product;
    }

    
}

export { StoreRepository };