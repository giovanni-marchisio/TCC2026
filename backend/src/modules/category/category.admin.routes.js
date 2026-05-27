import { autorize } from "../../middlewares/auth";
import { categoryController } from "./category.controller";

import { 
    deleteSchema, 
    listAllSchema, 
    modifySchema, 
    registerSchema, 
    restoreSchema,
    updateImageSchema 
} from "./category.schema";

export async function categoryAdminRoutes(server){
    server.addHook("preHandler", autorize);

    server.get("/", { schema: listAllSchema }, categoryController.listAll);
    server.post("/", { schema: registerSchema }, categoryController.register);
    server.delete("/:id", { schema: deleteSchema }, categoryController.delete);
    server.patch("/restaurar/:id", { schema: restoreSchema }, categoryController.restore);
    server.patch("/:id", { schema: modifySchema }, categoryController.modify);
    server.patch("/:id/imagem", { schema: updateImageSchema }, categoryController.updateImage);
}