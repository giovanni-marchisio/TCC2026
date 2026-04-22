import { database } from "../configs/database";

export const CategoryRepository = {
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

    async existsById(id){
        const [category] = await database.raw(
            `SELECT COUNT(*) as qtd FROM categoria WHERE id = ?`,
            [id]
        );

        return category[0];   
    },

    async findByName(name){

        const [category] = await database.raw(
            `SELECT COUNT(*) as qtd FROM categoria WHERE name ?`
        );

        return category[0];
    }

}
