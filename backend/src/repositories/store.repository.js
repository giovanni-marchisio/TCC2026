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

    async modify(dados){

        const {
            id,
            imagem,
            nome,
            descricao,
            preco,
            categoria,
            estoque
        } = dados;

        const [product] = await database.raw(
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

    async modifyCategory(dados){
        const {
            id,
            nome,
            imagem
        } = dados;

        const category = await database.raw(
            `UPDATE categoria SET
            nome = ?,
            imagem = ?
            WHERE id = ?`,
            [nome, imagem, id]
        );
    },

    async listAll(){
        const [list] = await database.raw(
            `SELECT
                produto.nome,
                produto.imagem,
                produto.descricao,
                produto.preco,
                categoria.nome as categoria,
                produto.estoque
            FROM produto
            INNER JOIN categoria ON categoria.id = produto.categoria_id`
        );

        return list;
    },

    async delete(id) {
        const [product] = await database.raw(
            `UPDATE produto SET ativo = FALSE WHERE id = ?`,
            [id]
        );
    },

    // async deleteCategory(id){}, Preciso modificar a tabela no banco.

    async restore(id){
        const [product] = await database.raw(
            `UPDATE produto SET ativo = TRUE WHERE id = ?`,
            [id]
        );
    },

    async verifyProduct(id){
        const [product] = await database.raw(
            `SELECT COUNT(*) as qtd FROM produto WHERE id = ?`,
            [id]
        );

        return product[0];
    },

    async verifyCategory(id){
        const [category] = await database.raw(
            `SELECT COUNT(*) as qtd FROM categoria WHERE id = ?`,
            [id]
        );

        return category[0];   
    },

    async findCategoryByName(name){

        const [category] = await database.raw(
            `SELECT COUNT(*) as qtd FROM categoria WHERE name ?`
        );

        return category[0];
    }

    
}

export { StoreRepository };