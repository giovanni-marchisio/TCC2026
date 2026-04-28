import { database } from "../configs/database"

export const userRepository = {

    async register(dados){

        const {
            nome, 
            email, 
            senha_hash, 
            telefone, 
            cpf
        } = dados;

        // Pelo que eu entendi nos exemplos da net(+ia, infelizmente, perdão por ser ruim) 
        // isto faz rollback caso tenha algum problema na criação do usuário.
        return database.transaction(async (bd) => {

            const [user] = await bd.raw(
                `INSERT INTO usuario (email, senha_hash, perfil, data_cadastro)
                 VALUES (?, ?, 'cliente', NOW())`,
                 [email, senha_hash]
            );

            const userId = user.insertId;

            await bd.raw(
                `INSERT INTO cliente (usuario_id, nome, telefone, cpf)
                 VALUES (?, ?, ?, ?)`,
                 [userId, nome, telefone, cpf]
            );

            return user;
        })

    },
    // Estou pensando em remover esta função, mas ainda acho que retornar a quantidade só para ver se o usuário existe é bom
    async searchById(id){
        const [user] = await database.raw(
            `SELECT COUNT(*) AS qtd FROM usuario WHERE id = ?`,
            [id]);

        return user[0];
    },

    async findById(id){
        const [user] = await database.raw(
            `SELECT id FROM cliente WHERE usuario_id = ?`,
            [id]
        );

        return user[0];
    },

    async searchByEmail(email){
        const [user] = await database.raw(
            `SELECT COUNT(*) AS qtd FROM usuario WHERE email = ?`,
            [email]);

        return user[0];
    },
    
    async findByEmail(email){
        const [user] = await database.raw(
            `SELECT
                usuario.id,
                usuario.email,
                usuario.senha_hash,
                usuario.perfil,
                cliente.nome,
                usuario.ativo
            FROM usuario
            INNER JOIN cliente ON cliente.usuario_id = usuario.id
            WHERE usuario.email = ? AND ativo = TRUE`,
            [email]);

        return user[0];
    },

    async searchByCpf(cpf){
        const [user] = await database.raw(
            `SELECT COUNT(*) as qtd_cpf FROM cliente WHERE cpf = ?`,
            [cpf]);

        return user[0];
    },
    // No banco de dados tá com ON DELETE CASCADE, pelo que eu entendi da pra usar no TCC
    // Mas o recomendado é fazer uma transaction para ter como remover coisas como pedido, etc..
    // Funções só pra admin ->
    async delete(id){
        const [user] = await database.raw(
            `UPDATE usuario SET ativo = FALSE WHERE id = ?`,
            [id]
        );

        return user;
    },

    async restore(id){
        const [user] = await database.raw(
            `UPDATE usuario SET ativo = TRUE WHERE id = ?`,
            [id]
        )

        return user;
    },

    async modify(id, dados){
        const { telefone, senha_hash } = dados;

        if (telefone){
            const [phone] = await database.raw(
                `UPDATE cliente SET telefone = ? WHERE usuario_id = ?`,
                [telefone, id]
            );
            return phone;
        }

        if (senha_hash){
            const [password] = await database.raw(
                `UPDATE usuario SET senha_hash = ? WHERE id = ?`,
                [senha_hash, id]
            );

            return password;
        }
    },

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
            LEFT JOIN cliente on cliente.usuario_id = usuario.id
            LEFT JOIN endereco ON endereco.cliente_id = cliente.id`
        );

        return list;  
    },

}
