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
        
        const [res] = await database.raw(
        `INSERT INTO endereco (
            cliente_id,
            apelido, 
            complemento, 
            logradouro, 
            numero, 
            bairro, 
            cidade, 
            uf, 
            cep) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [cliente_id, apelido, complemento, logradouro, numero, bairro, cidade, uf, cep]
        );

        return { id: res.insertId };
    }
}