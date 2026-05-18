import { database } from "../../configs/database";

class ProductRepositoryClass {
    async register(data){
        const {
            image,
            name,
            description,
            price,
            category,
            stock
        } = data;

        const [product] = await database.raw(
            `INSERT INTO produto 
            (
                imagem, 
                nome, 
                descricao, 
                preco, 
                categoria_id, 
                estoque,
                ativo
            ) VALUES (?, ?, ?, ?, ?, ?, TRUE)`,
            [image, name, description, price, category, stock]
        );

        return { 
            product_id: product.insertId, 
            affectedRows: product.affectedRows
        };
    };
    async delete(id, db){
        const [product] = await db.raw(
            `UPDATE produto SET
                ativo = FALSE
             WHERE id = ?`,
            [id]
        );

        return { 
            id: id,
            affectedRows: product.affectedRows
         };
    };
    async restore(id){
        const [product] = await database.raw(
            `UPDATE produto SET
                ativo = TRUE
             WHERE id = ?`,
            [id]
        );

        return { id: id };
    };
    async modify(id, data){
        const {
            image,
            name,
            description,
            price,
            category,
            stock
        } = data;

        const [product] = await database.raw(
            `UPDATE produto SET
                imagem = ?,
                nome = ?,
                descricao = ?,
                preco = ?,
                categoria_id = ?,
                estoque = ?
             WHERE id = ?`,
            [image, name, description, price, category, stock, id]
        );

        return {
            product_id: product.insertId, 
            affectedRows: product.affectedRows 
        };
    };
    async list(){
        const [list] = await database.raw(
            `SELECT
                produto.id AS id,
                produto.nome,
                produto.imagem,
                produto.descricao,
                produto.preco,
                categoria.nome as categoria,
                produto.estoque
             FROM produto
             INNER JOIN categoria ON categoria.id = produto.categoria_id
             WHERE produto.ativo = TRUE
            `
        );

        return list;
    };
    async listAll(){
        const [list] = await database.raw(
            `SELECT
                produto.id AS id,
                produto.nome,
                produto.imagem,
                produto.descricao,
                produto.preco,
                categoria.nome as categoria,
                produto.estoque,
                produto.ativo
             FROM produto
             INNER JOIN categoria ON categoria.id = produto.categoria_id
            `
        );

        return list;        
    };
    async findById(id){
        const [product] = await database.raw(
            `SELECT
                produto.id AS id,
                produto.nome,
                produto.imagem,
                produto.descricao,
                produto.preco,
                categoria.nome as categoria,
                produto.estoque,
                produto.ativo
             FROM produto
             INNER JOIN categoria ON categoria.id = produto.categoria_id
             WHERE produto.id = ?`,
            [id]
        );

        return product[0];
    };
    async findByName(name){
        const [product] = await database.raw(
            `SELECT * 
              FROM produto
             WHERE nome = ?`,
            [name]
        );

        return product[0];
    };
    async searchByName(name){
        const [list] = await database.raw(
            `SELECT
                produto.id AS id,
                produto.nome,
                produto.imagem,
                produto.descricao,
                produto.preco,
                categoria.nome as categoria,
                produto.estoque
             FROM produto
             INNER JOIN categoria ON categoria.id = produto.categoria_id
             WHERE produto.nome LIKE ? AND produto.ativo = TRUE`,
            [`%${name}%`]
        );

        return list;
    };
    async updateStock(id, newValue, db){
        const [product] = await db.raw(
            `UPDATE produto SET
                estoque = ?
             WHERE id = ?`,
            [newValue, id]
        );

        return { 
            affectedRows: product.affectedRows
        }
    };
}

export const ProductRepository = new ProductRepositoryClass();