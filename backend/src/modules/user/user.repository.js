import { database } from "../../configs/database.js";

class UserRepositoryClass {
    async register(data){
        const {
            name,
            email,
            password,
            phone,
        } = data;

        return database.transaction(async (db) => {
            const [user] = await db.raw(
                `INSERT INTO usuario 
                (
                    email,
                    senha_hash,
                    perfil,
                    data_cadastro
                ) VALUES (?, ?, 'cliente', NOW())`,
                [email, password]
            );

            const user_id = user.insertId;

            await db.raw(
                `INSERT INTO cliente 
                (
                    usuario_id,
                    nome,
                    telefone
                ) VALUES (?, ?, ?)`,
                [user_id, name, phone]
            );

            return {
                id: user_id, 
                affectedRows: user.affectedRows
            };
        });
    };
    async delete(id){
        const [user] = await database.raw(
            `UPDATE usuario SET 
                ativo = FALSE
             WHERE id = ?`,
            [id]
        );

        return id;
    };
    async restore(id){
        const [user] = await database.raw(
            `UPDATE usuario SET
                ativo = TRUE
             WHERE id = ?`,
            [id]
        );

        return id;
    };
    async modify(id, data){
        const {
            phone
        } = data;

        const [number] = await database.raw(
            `UPDATE cliente SET
                telefone = ?
             WHERE usuario_id = ?`,
            [phone, id]
        );

        return {
            id: id,
            affectedRows: number.affectedRows
        };
    };
    async list(){
        const [list] = await database.raw(
            `SELECT
                usuario.id,
                usuario.email,
                usuario.perfil,
                usuario.data_cadastro,
                usuario.ativo,
                cliente.nome,
                cliente.telefone,
                endereco.apelido,
                endereco.complemento,
                endereco.logradouro,
                endereco.numero,
                endereco.bairro,
                endereco.cidade,
                endereco.uf,
                endereco.cep
             FROM usuario
             LEFT JOIN cliente ON cliente.usuario_id = usuario.id
             LEFT JOIN endereco ON endereco.cliente_id = cliente.id`
        );

        return list;
    };
    async findById(id){
        const [info] = await database.raw(
            `SELECT
                cliente.id,
                usuario.email,
                usuario.data_cadastro,
                cliente.nome,
                cliente.telefone,
                endereco.apelido,
                endereco.complemento,
                endereco.logradouro,
                endereco.numero,
                endereco.bairro,
                endereco.cidade,
                endereco.uf,
                endereco.cep
             FROM usuario
             LEFT JOIN cliente ON cliente.usuario_id = usuario.id
             LEFT JOIN endereco ON endereco.cliente_id = cliente.id 
             WHERE usuario.id = ?`,
                [id]
        );

        return info[0];
    };
    async findByEmail(email){
        const [user] = await database.raw(
            `SELECT
                usuario.id AS id,
                usuario.email,
                usuario.senha_hash,
                usuario.perfil,
                cliente.nome,
                cliente.id AS cliente_id,
                usuario.ativo
             FROM usuario
             INNER JOIN cliente ON cliente.usuario_id = usuario.id
             WHERE usuario.email = ?`,
            [email]
        );

        return user[0];
    };
    async findClientByUserId(user_id){
        const [user] = await database.raw(
            `SELECT cliente.* FROM cliente
             WHERE cliente.usuario_id = ?`,
             [user_id]
        );

        return user[0];
    };
    async updatePassword(user_id, hash_password){
        const [user] = await database.raw(
            `UPDATE usuario SET
             senha_hash = ?
             WHERE id = ?`,
             [hash_password, user_id]
        );

        return user;
    }

}

export const UserRepository = new UserRepositoryClass();