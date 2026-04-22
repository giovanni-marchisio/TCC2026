import { productController } from "../controllers/product.controllers";
import { verifyToken, onlyAdmin } from "../middlewares/auth.middleware";

/**
 * 
 * @param {import("fastify").FastifyInstance} server 
 */

export function productRoutes(server){
    
    server.get('/listar', productController.list);

    server.post('/registrar', {
        preHandler: onlyAdmin
    }, productController.register);

    server.patch('/modificar/:id', {
        preHandler: onlyAdmin
    }, productController.modify);

}