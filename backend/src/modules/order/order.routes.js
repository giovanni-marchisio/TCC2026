import { authenticate } from "../../middlewares/auth";
import { orderController } from "./order.controller";

import { 
    createOrderSchema, 
    findAllOrderSchema, 
    findByIdOrderSchema 
} from "./order.schema";

export async function orderRoutes(server){
    server.addHook("preHandler", authenticate);

    server.post("/", { schema: createOrderSchema }, orderController.create);
    server.get("/", { schema: findAllOrderSchema }, orderController.findAll);
    server.get(":id", { schema: findByIdOrderSchema }, orderController.findById);
};