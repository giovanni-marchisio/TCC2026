import { autorize } from "../../middlewares/auth";
import { categoryController } from "./category.controller";

export async function categoryAdminRoutes(server){
    server.addHook("preHandler", autorize);

    server.get("/", categoryController.listAll);
    server.post("/", categoryController.register);
    server.delete("/:id", categoryController.delete);
    server.patch("/restaurar/:id", categoryController.restore);
    server.patch("/:id", categoryController.modify);
}