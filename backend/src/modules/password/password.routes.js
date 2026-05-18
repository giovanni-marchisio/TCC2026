import { passwordController } from "./password.controller";

export async function passwordRoutes(server){
    server.post("/recuperar", passwordController.requestReset);
    server.post("/redefinir", passwordController.resetPassword);    
}