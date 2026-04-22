import { categoryController } from "../controllers/category.controllers";
import { verifyToken, onlyAdmin } from "../middlewares/auth.middleware";

/**
 * 
 * @param {import("fastify").FastifyInstance} server 
 */

export function categoryRoutes(server){

    server.post('/registrar', {
        preHandler: onlyAdmin
    }, categoryController.register);

    server.patch('/modificar/:id', {
        preHandler: onlyAdmin
    }, categoryController.modify);
}

