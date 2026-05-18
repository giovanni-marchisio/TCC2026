import { authenticate, autorize } from "../../middlewares/auth";
import { userController } from "./user.controller";

import { 
    registerSchema, 
    loginSchema,
    profileSchema,

} from "./user.schema";

export async function userRoutes(server){
    server.post("/", { schema: registerSchema }, userController.register);
    server.post("/login", { schema: loginSchema }, userController.login);

    server.get("/perfil", {
        preHandler: authenticate,
        schema: profileSchema
    }, userController.profile);
    server.patch("/perfil", {
        preHandler: authenticate
    }, userController.modify);

}