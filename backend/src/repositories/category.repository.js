import { database } from "../configs/database";

export const categoryRepository = {
    async register(dados){
        const {
            nome,
            imagem
        } = dados;

        await database.raw(
            `INSERT INTO categoria (nome, imagem)
            VALUES(?, ?)`,
            [nome, imagem]
        );

        return { message: 'Categoria registrada' };
    },

    async modify(id, dados){
        const {
            nome,
            imagem
        } = dados;

        await database.raw(
            `UPDATE categoria SET
            nome = ?,
            imagem = ?
            WHERE id = ?`,
            [nome, imagem, id]
        );

        return { message: 'Categoria modificada' };
    },

    async delete(id){
        await database.transaction(async (bd) => {
            await bd.raw(
                `UPDATE categoria SET ativo = FALSE WHERE id = ?`,
                [id]
            );

            await bd.raw(
                `UPDATE produto SET ativo = FALSE WHERE categoria_id = ?`,
                [id]
            );
        });

        return { message: 'Categoria deletada'};
    },

    async restore(id){
        await database.transaction(async (bd) => {
            await bd.raw(
                `UPDATE categoria SET ativo = TRUE WHERE id = ?`,
                [id]
            );

            await bd.raw(
                `UPDATE produto SET ativo = TRUE WHERE categoria_id = ?`,
                [id]
            );
        });

        return { message: 'Categoria reativada'};
    },

    async list(){
        const [list] = await database.raw(
            `SELECT
            categoria.nome,
            categoria.imagem
             FROM categoria WHERE ativo = TRUE`
        );

        return list;
    },

    async listAll(){
        const [list] = await database.raw(
            `SELECT * FROM categoria`
        );

        return list;
    },

    async existsById(id){
        const [category] = await database.raw(
            `SELECT COUNT(*) as qtd FROM categoria WHERE id = ?`,
            [id]
        );

        return category[0];   
    },

    async findByName(name){

        const [category] = await database.raw(
            `SELECT COUNT(*) as qtd FROM categoria WHERE nome = ?`,
            [name]
        );

        return category[0];
    }

}
