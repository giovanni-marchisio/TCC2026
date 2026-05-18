import { userService } from "./user.service";

export const userController = {
    async register(request, reply){
        const data = request.body;
        const { id, affectedRows } = await userService.register(data);

        return reply.status(201).send({
            message: "Registrado com sucesso!",
            id: id,
            affectedRows: affectedRows
        });
    },
    async login(request, reply){
        const user = await userService.login(request.body);
        const token = await reply.jwtSign(
            { 
                id: user.id,
                client_id: user.client_id,
                type: user.type,
                active: user.active
            },
            { expiresIn: '1d' }
        );

        return reply.status(200).send({
            token
        });
    },
    async delete(request, reply){
        const { id } = request.params;

        await userService.delete(id);
        return reply.status(200).send({
            message: "Usuário deletado!",
            user_id: id
        });
    },
    async restore(request, reply){
        const { id } = request.params;

        await userService.restore(id);
        return reply.status(200).send({
            message: "Usuário reativado!",
            user_id: id
        })
    },
    async modify(request, reply){
        const { id } = request.user;
        const data = request.data;
        const { affectedRows } = await userService.modify(id, data);

        return reply.status(200).send({
            message: "Dados modificados", 
            user_id: id, 
            affectedRows: affectedRows
        });
    },
    async list(request, reply){
        const list = await userService.list();

        return reply.status(200).send(
            list
        );
    },
    async profile(request, reply){
        const { id } = request.user;
        const info = await userService.profile(id);

        return reply.status(200).send(
            info
        );
    }
}