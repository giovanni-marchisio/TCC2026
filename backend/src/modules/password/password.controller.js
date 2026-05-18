import { passwordService } from "./password.service";

export const passwordController = {
    async requestReset(request, reply){
        const { email } = request.body;

        await passwordService.requestReset(email);
        return reply.status(200).send({
            message: "Email com as intruções enviados!"
        })
    },    
    async resetPassword(request, reply){
        const { token, new_password } = request.body;
        
        await passwordService.resetPassword(token, new_password);
        return reply.status(200).send({
            message: "Senha atualizada com sucesso!"
        });
    },    
}