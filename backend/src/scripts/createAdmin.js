import "dotenv/config";
import bcrypt from "bcrypt";
import { database } from "../configs/database.js";

async function createAdmin(){
    const email = process.argv[2];
    const password = process.argv[3];
    const name = process.argv[4] || "Adminstrador";


    if (!email || !password){
        console.log("Dados inválidos!\nUso: node src/scripts/createAdmin.js <email> <senha> <nome>");
        process.exit(1);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await database.transaction(async (bd) => {
        const [user] = await bd.raw(
            `INSERT INTO usuario
            (email, senha_hash, perfil, data_cadastro)
            VALUES(?, ?, 'admin', NOW())`,
            [email, hashPassword]
        );

        await bd.raw(
            `INSERT INTO cliente
            (usuario_id, nome, telefone, cpf)
            VALUES(?, ?, '00000000000', '00000000000')`,
            [user.insertId, name]
        );
    });

    console.log("Admin criado com sucesso!");
    process.exit(0);
}

// Tinha esquecido de chamar a função, levei o nome da pasta a sério e achei que era automático.
createAdmin();