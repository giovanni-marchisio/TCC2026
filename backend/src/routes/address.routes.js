import { addressController } from "../controllers/address.controller";
import { verifyToken, onlyAdmin } from "../middlewares/auth.middleware";

/**
 * 
 * @param {import("fastify").FastifyInstance} server 
 */

export function addressRoutes(server){

    server.post('/cadastrar', {
        preHandler: verifyToken
    }, addressController.register);
    
}