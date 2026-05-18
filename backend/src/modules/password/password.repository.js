import { database } from "../../configs/database";

class PasswordRepositoryClass {
    async createToken(user_id, token, expires_in){
        const [result] = await database.raw(
            `INSERT INTO recuperacao_senha
            (
                usuario_id,
                token,
                expira_em
            ) VALUES (?, ?, ?)`,
             [user_id, token, expires_in]
        );

        return result;
    }
    async findByToken(token){
        const [result] = await database.raw(
            `SELECT * FROM recuperacao_senha
             WHERE token = ?`,
             [token]
        );

        return result[0];
    }
    async markAsUsed(id){
        const [result] = await database.raw(
            `UPDATE recuperacao_senha
             SET usado = TRUE
             WHERE id = ?`,
             [id]
        );

        return result;
    }
    async deleteByUserId(user_id){
        const [result] = await database.raw(
            `DELETE FROM recuperacao_senha
             WHERE usuario_id = ?`,
             [user_id]
        );

        return result
    }
}

export const PasswordRepository = new PasswordRepositoryClass();