import { passwordController } from "./password.controller";

import { 
    requestResetSchema, 
    resetPasswordSchema 
} from "./password.schema";

export async function passwordRoutes(server){
    server.post("/recuperar", { schema: requestResetSchema }, passwordController.requestReset);
    server.post("/redefinir", { schema: resetPasswordSchema }, passwordController.resetPassword);    
}