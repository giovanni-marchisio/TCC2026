import { autorize } from "../../middlewares/auth";
import { paymentController } from "./payment.controller";

export async function paymentAdminRoutes(server){
    server.addHook("preHandler", autorize);
    
    server.get("/", paymentController.findAll);
    server.get("/pendente", paymentController.findPending);
    server.patch("/:order_id/status", paymentController.updateStatus);
}