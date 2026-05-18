import { authenticate } from "../../middlewares/auth";
import { paymentController } from "./payment.controller";

import { 
    findPaymentByOrderSchema, 
    listPaymentSchema 
} from "./payment.schema";

export async function paymentRoutes(server){
    server.addHook("preHandler", authenticate);
    
    server.get("/:order_id", { schema: findPaymentByOrderSchema }, paymentController.findByOrderId);
    server.get("/", { schema: listPaymentSchema }, paymentController.list)
}