import { authenticate } from "../../middlewares/auth";
import { orderController } from "./order.controller";

export async function orderRoutes(server){
    server.addHook("preHandler", authenticate);

    server.post("/", orderController.create);
    server.get("/", orderController.findAll);
    server.get(":id", orderController.findById);
};