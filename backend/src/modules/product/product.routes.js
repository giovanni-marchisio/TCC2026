import { authenticate } from "../../middlewares/auth";
import { productController } from "./product.controller";
import { findAllSchema, findByIdSchema } from "./product.schema";

export async function productRoutes(server){
    server.get("/", { schema: findAllSchema }, productController.list);
    server.get("/:id", { schema: findByIdSchema }, productController.findById);
}