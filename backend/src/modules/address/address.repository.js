import { database } from "../../configs/database";

class AddressRepositoryClass {
    async register(user_id, data){
        const {
            label = null,
            complement = null,
            street,
            streetNumber,
            neighborhood,
            city,
            state,
            postalCode,
        } = data;

        const [address] = await database.raw(
            `INSERT INTO endereco 
            (
                cliente_id,
                apelido,
                complemento,
                logradouro,
                numero,
                bairro,
                cidade,
                uf,
                cep,
                endereco_principal
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, TRUE)`,
                [
                user_id, 
                label, 
                complement, 
                street, 
                streetNumber, 
                neighborhood,
                city,
                state,
                postalCode
                ]
        );

        return {
            id: address.insertId,
            affectedRows: address.affectedRows
        }
    }
    async delete(id){
        const [address] = await database.raw(
            `UPDATE endereco SET
                ativo = FALSE
             WHERE id = ?`,
            [id]
        );

        return {
            id: id,
            affectedRows: address.affectedRows
        }
    }
    async restore(id){
        const [address] = await database.raw(
            `UPDATE endereco SET
                ativo = TRUE
             WHERE id = ?`,
            [id]
        );

        return {
            id: id,
            affectedRows: address.affectedRows
        }
    }
    async modify(id, data){
        const {
            label,
            complement,
            street,
            streetNumber,
            neighborhood,
            city,
            state,
            postalCode,
        } = data;
        
        const [address] = await database.raw(
            `UPDATE endereco SET
                apelido = ?,
                complemento = ?,
                logradouro = ?,
                numero = ?,
                bairro = ?,
                cidade = ?,
                uf = ?,
                cep = ?
             WHERE id = ?
                `
        )
    }
    async list(user_id){
        const [list] = await database.raw(
            `SELECT * FROM endereco
             WHERE cliente_id = ?`,
             [user_id]
        );

        return list ?? [];
    }
    async findById(id){
        const [address] = await database.raw(
            `SELECT * FROM endereco
             WHERE id = ?`,
             [id]
        );

        if (!address[0]) return null;

        return {
            id: id,
            client_id: address[0].cliente_id,
            label: address[0].apelido,
            complement: address[0].complemento,
            street: address[0].logradouro,
            streetNumber: address[0].numero,
            neighborhood: address[0].bairro,
            city: address[0].cidade,
            state: address[0].uf,
            postalCode: address[0].cep
        };
    }
    async setMain(user_id, id){
        return database.raw(async (db) => {
            await db.raw(
                `UPDATE endereco SET
                 endereco_principal = FALSE
                 WHERE cliente_id = ?`,
                 [user_id]
            );

            await db.raw(
                `UPDATE endereco SET
                 endereco_principal = TRUE
                 WHERE id = ?`,
                 [user_id]
            );

            return db.affectedRows;
        })
    }
};

export const AddressRepository = new AddressRepositoryClass();