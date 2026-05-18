import { authenticate, autorize } from "../../middlewares/auth";
import { userController } from "./user.controller";

export async function userRoutes(server){
    server.post("/", userController.register);
    server.post("/login", userController.login);

    server.get("/perfil", {
        preHandler: authenticate
    }, userController.profile);
    server.patch("/perfil", {
        preHandler: authenticate
    }, userController.modify);

}