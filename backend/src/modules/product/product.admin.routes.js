import { autorize } from "../../middlewares/auth";
import { productController } from "./product.controller";

import { 
    createSchema, 
    updateSchema, 
    deleteSchema, 
    restoreSchema, 
    listAllSchema 
} from "./product.schema";

export async function productAdminRoutes(server){
    server.addHook("preHandler", autorize);

    server.get("/", { schema: listAllSchema }, productController.listAll);
    server.post("/", { schema: createSchema }, productController.register);
    server.delete("/:id", { schema: deleteSchema }, productController.delete);
    server.patch("/restaurar/:id", { schema: restoreSchema }, productController.restore);
    server.patch("/:id", { schema: updateSchema }, productController.modify);
};