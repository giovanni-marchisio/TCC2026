import { database } from "../configs/database";

export const addressRepository = {
    async register(cliente_id, dados){
        const {
            apelido = null, // Caso não tiver apelido
            complemento = null,
            logradouro,
            numero,
            bairro,
            cidade,
            uf,
            cep
        } = dados;
        
        const [address] = await database.raw(
        `INSERT INTO endereco (
            cliente_id,
            apelido, 
            complemento, 
            logradouro, 
            numero, 
            bairro, 
            cidade, 
            uf, 
            cep,
            endereco_principal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, TRUE)`,
            [cliente_id, apelido, complemento, logradouro, numero, bairro, cidade, uf, cep]
        );

        return address;
    },

    async delete(id){
        const [address] = await database.raw(
            `UPDATE endereco SET ativo = FALSE WHERE id = ?`,
            [id]
        );

        return address;
    },
    // Talvez um botão de desfazer em alguma notificação de toast possa usar isso, sla
    async restore(id){
        const [address] = await database.raw(
            `UPDATE endereco SET ativo = TRUE WHERE id = ?`,
            [id]
        );

        return address;
    },

    async modify(id, dados){
        const {
            apelido = null,
            complemento = null,
            logradouro,
            numero,
            bairro,
            cidade,
            uf,
            cep
        } = dados;

        const [address] = await database.raw(
        `UPDATE endereco SET
            apelido = ?, 
            complemento = ?, 
            logradouro = ?, 
            numero = ?, 
            bairro = ?, 
            cidade = ?, 
            uf = ?, 
            cep = ? WHERE id = ?`,
            [apelido, complemento, logradouro, numero, bairro, cidade, uf, cep, id]
        );

        return address;
    },

    async findById(id){
        const [address] = await database.raw(
            `SELECT * FROM endereco WHERE id = ?`,
            [id]
        );

        return address[0];
    },

}