import { userController } from "../controllers/user.controller";
import { verifyToken, onlyAdmin } from "../middlewares/auth.middleware";

/**
 * 
 * @param {import("fastify").FastifyInstance} server 
 */

export function userRoutes(server) {

    // Vou começar a separar as rotas já que eu fiz um middlewarezin de autenticação
    // Rotas públicas
    server.post("/login", userController.login);

    server.post("/cadastrar", userController.register);
    // Preciso criar as rotas de compra. Vou deixar alguns placeholders

    // server.get("/carrinho", {
    // preHandler:verifyToken 
    // }, userController.cart);

    // server.post("/checkout", {
    // preHandler:verifyToken 
    // }, userController.checkout);
    
    // Não sei se vai ser preciso uma rota para finalização da compra.

    server.patch("/perfil", {
        preHandler: verifyToken
    }, userController.modify);

    // Rotas do adm
    server.delete("/desativar/:id", { 
        preHandler: onlyAdmin 
    }, userController.delete);

    server.patch("/restaurar/:id", {
        preHandler: onlyAdmin
    }, userController.restore);

    server.get("/listar", {
        preHandler: onlyAdmin
    }, userController.list);
}
