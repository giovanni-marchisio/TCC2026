import { categoryController } from "../controllers/category.controllers";
import { verifyToken, onlyAdmin } from "../middlewares/auth.middleware";

/**
 * 
 * @param {import("fastify").FastifyInstance} server 
 */

export function categoryRoutes(server){

    server.get('/listar', 
        categoryController.list);

    server.get('/listar/todas', {
        preHandler: onlyAdmin
    }, categoryController.listAll);

    server.post('/registrar', {
        preHandler: onlyAdmin
    }, categoryController.register);

    server.delete('/deletar/:id', {
        preHandler: onlyAdmin
    }, categoryController.delete);

    server.patch('/restaurar/:id', {
        preHandler: onlyAdmin
    }, categoryController.restore);

    server.patch('/modificar/:id', {
        preHandler: onlyAdmin
    }, categoryController.modify);
}

