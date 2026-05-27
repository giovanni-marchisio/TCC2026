import { autorize } from "../../middlewares/auth";
import { userController } from "./user.controller";
import { deleteSchema, restoreSchema } from "./user.schema";

export async function userAdminRoutes(server){
    server.addHook("preHandler", autorize);

    server.get("/", userController.list);
    server.delete("/:id", { schema: deleteSchema }, userController.delete);
    server.patch("/restaurar/:id", { schema: restoreSchema }, userController.restore);

};