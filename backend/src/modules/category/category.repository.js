import { database } from "../../configs/database";

class CategoryRepositoryClass {
    async register(data){
        const { name } = data;

        const [category] = await database.raw(
            `INSERT INTO categoria 
            (
                nome
            ) VALUES (?)`, 
            [name]
        );

        return { category_id: category.insertId };
    };
    async delete(id){
        const [category] = await database.transaction(async (db) =>{
            await db.raw(
                `UPDATE categoria SET
                    ativo = FALSE
                 WHERE id = ?`,
                [id]
            );

            await db.raw(
                `UPDATE produto SET
                    ativo = FALSE
                 WHERE id = ?`,
                [id]
            );
        });

        return {
            id: id,
            affectedRows: category.affectedRows
        };
    };
    async restore(id){
        const [category] = await database.transaction(async (db) =>{
            await db.raw(
                `UPDATE categoria SET
                    ativo = TRUE
                 WHERE id = ?`,
                [id]
            );

            await db.raw(
                `UPDATE produto SET
                    ativo = TRUE
                 WHERE id = ?`,
                [id]
            );
        });

        return {
            id: id,
            affectedRows: category.affectedRows
        };
    };
    async modify(id, data){
        const { name } = data;

        const [category] = await database.raw(
            `UPDATE categoria SET
                nome = ?
             WHERE id = ?`,
            [name, id]
        );

        return {
            id: id,
            affectedRows: category.affectedRows
        };
    };
    async list(){
        const [list] = await database.raw(
            `SELECT * FROM categoria
             WHERE ativo = TRUE`
        );

        return list ?? [];
    };
    async listAll(){
        const [list] = await database.raw(
            `SELECT * 
             FROM categoria`
        );

        return list ?? [];
    };
    async findById(id){
        const [category] = await database.raw(
            `SELECT * FROM categoria
            WHERE id = ?`,
            [id]
        );

        return category[0];
    };
    async findByName(name){
        const [category] = await database.raw(
            `SELECT * FROM categoria
            WHERE nome = ?`,
            [name]
        );

        return category[0];
    };
    async searchByName(name){
        const [category] = await database.raw(
            `SELECT * FROM categoria
            WHERE nome LIKE ?`,
            [`%${name}%`]
        );

        return category;
    };
    async listProductsByCategoryId(id){
        const [list] = await database.raw(
            `SELECT
                produto.id AS id,
                produto.nome,
                produto.imagem_thumb,
                produto.imagem,
                produto.imagem_medium,
                produto.descricao,
                produto.preco,
                categoria.nome as categoria,
                produto.estoque,
                produto.ativo
            FROM produto
            INNER JOIN categoria ON categoria.id = produto.categoria_id
            WHERE categoria.id = ? AND produto.ativo = TRUE`,
            [id]
        );
        
        return list ?? [];
    };
    async updateImage(id, image, image_thumb){
        const [category] = await database.raw(
            `UPDATE categoria SET
                imagem = ?,
                imagem_thumb = ?
             WHERE id = ?`,
             [image, image_thumb, id]       
        );

        return {
            id: id,
            affectedRows: category.affectedRows
        };
    }
}

export const CategoryRepository = new CategoryRepositoryClass();