import { autorize } from "../../middlewares/auth";
import { userController } from "./user.controller";

export async function userAdminRoutes(server){
    server.addHook("preHandler", autorize);

    server.get("/", userController.list);
    server.delete("/:id", userController.delete);
    server.patch("/restaurar/:id", userController.restore);

};