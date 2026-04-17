import { userController } from "../controllers/user.controller";
import { verifyToken, onlyAdmin } from "../middlewares/auth.middleware";

/**
 * 
 * @param {import("fastify").FastifyInstance} server 
 */

function userRoutes(server) {

    // Vou começar a separar as rotas já que eu fiz um middlewarezin de autenticação
    // Rotas públicas
    server.post("/login", userController.login);
    server.post("/cadastrar", userController.register);

    // Rotas do adm
    server.delete("/usuario/:id", { 
        preHandler: onlyAdmin 
    }, userController.delete);

    server.patch("/usuario/:id/restaurar", {
        preHandler: onlyAdmin
    }, userController.restore);
}

export { userRoutes };