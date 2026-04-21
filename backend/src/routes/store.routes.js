import { storeController } from "../controllers/store.controllers";
import { verifyToken, onlyAdmin } from "../middlewares/auth.middleware";

/**
 * 
 * @param {import("fastify").FastifyInstance} server 
 */

function storeRoutes(server){
    server.get("/listar", storeController.listAll);

    server.patch("/modificar", {
        preHandler: onlyAdmin
    }, storeController.modify);

    server.patch("/categoria/modificar", {
        preHandler: onlyAdmin
    }, storeController.modifyCategory);

    server.post("/registrar", {
        preHandler: onlyAdmin
    },
    storeController.register);

    server.post("/categoria/registrar", {
        preHandler: onlyAdmin
    }, storeController.registerCategory);

}

export { storeRoutes };