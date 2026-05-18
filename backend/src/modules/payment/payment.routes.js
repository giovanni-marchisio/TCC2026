import { authenticate } from "../../middlewares/auth";
import { paymentController } from "./payment.controller";

export async function paymentRoutes(server){
    server.addHook("preHandler", authenticate);
    
    server.get("/:order_id", paymentController.findByOrderId);
}