import { userController } from "../controllers/user.controller";

/**
 * 
 * @param {import("fastify").FastifyInstance} server 
 */

function userRoutes(server) {

    server.post("/login", userController.login);

    server.post("/cadastrar", userController.register);

    server.delete("/delete/:id", userController.delete);
}

export { userRoutes };