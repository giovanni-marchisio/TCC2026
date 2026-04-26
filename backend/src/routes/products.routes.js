import { productController } from "../controllers/product.controller";
import { verifyToken, onlyAdmin } from "../middlewares/auth.middleware";

/**
 * 
 * @param {import("fastify").FastifyInstance} server 
 */

export function productRoutes(server){
    
    server.get('/listar', productController.list);

    server.get('/listar/todos', {
        preHandler: onlyAdmin
    }, productController.listAll);

    server.post('/registrar', {
        preHandler: onlyAdmin
    }, productController.register);

    server.delete('/desativar/:id', {
        preHandler: onlyAdmin
    }, productController.delete);

    server.patch('/restaurar/:id', {
        preHandler: onlyAdmin
    }, productController.restore);

    server.patch('/modificar/:id', {
        preHandler: onlyAdmin
    }, productController.modify);

}