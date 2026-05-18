import crypto from "crypto";
import bcrypt from "bcrypt";
import { PasswordRepository } from "./password.repository";
import { UserRepository } from "../user/user.repository";
import { sendPasswordReset } from "../../utils/email";

import { 
    NotFoundError, 
    ValidationError 
} from "../../utils/errors";

export const passwordService = {
    async requestReset(email){
        const user = await UserRepository.findByEmail(email);
        // sla se posso colocar algo útil na mensagem aqui
        // perigoso, perigoso
        if (!user) throw new NotFoundError("Email com as intruções enviados!");

        await PasswordRepository.deleteByUserId(user.id);

        const token = crypto.randomBytes(32).toString("hex");
        const expires_in = new Date(Date.now() + 1 * 60 * 60 * 1000);

        await PasswordRepository.createToken(user.id, token, expires_in);

        const link = `${process.env.FRONTEND_URL}/reset-senha?token=${token}`;
        
        await sendPasswordReset(email, link)
    },
    async resetPassword(token, new_password){
        const request = await PasswordRepository.findByToken(token);
        if (!request) throw new ValidationError("Token inválido!");

        if (new Date() > new Date(request.expira_em)) throw new ValidationError("Token expirado!");
        if (request.usado) throw new ValidationError("Token já foi utilizado!");

        const hash_password = await bcrypt.hash(new_password, 10);

        await UserRepository.updatePassword(request.usuario_id, hash_password);
        await PasswordRepository.markAsUsed(request.id);
    }
};
