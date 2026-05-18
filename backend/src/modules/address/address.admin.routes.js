import { autorize } from "../../middlewares/auth";
import { addressController } from "./address.controller";

export async function addressAdminRoutes(server){
    server.addHook("preHandler", autorize);
    // Não sei se vai ser preciso ter uma rota de admin para os endereços.
}