import { autorize } from "../../middlewares/auth";
import { paymentController } from "./payment.controller";

import { 
    findAllPaymentSchema, 
    updatePaymentStatusSchema 
} from "./payment.schema";

export async function paymentAdminRoutes(server){
    server.addHook("preHandler", autorize);
    
    server.get("/", { schema: findAllPaymentSchema }, paymentController.findAll);
    server.patch("/:order_id/status", { schema: updatePaymentStatusSchema }, paymentController.updateStatus);
}