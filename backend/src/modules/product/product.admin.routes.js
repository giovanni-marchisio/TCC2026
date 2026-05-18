import { autorize } from "../../middlewares/auth";
import { productController } from "./product.controller";
import { createSchema, updateSchema, deleteSchema } from "./product.schema";

export async function productAdminRoutes(server){
    server.addHook("preHandler", autorize);

    server.get("/", productController.listAll);
    server.post("/", { schema: createSchema }, productController.register);
    server.delete("/:id", { schema: deleteSchema }, productController.delete);
    server.patch("/restaurar/:id", productController.restore);
    server.patch("/:id", { schema: updateSchema }, productController.modify);
};