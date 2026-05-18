import { authenticate } from "../../middlewares/auth";
import { productController } from "./product.controller";

import { 
    listSchema, 
    findByIdSchema 
} from "./product.schema";

export async function productRoutes(server){
    server.get("/", { schema: listSchema }, productController.list);
    server.get("/:id", { schema: findByIdSchema }, productController.findById);
}