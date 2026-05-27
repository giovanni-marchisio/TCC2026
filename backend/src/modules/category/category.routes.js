import { categoryController } from "./category.controller"
import { listProductsByCategoryIdSchema, listSchema } from "./category.schema";

export async function categoryRoutes(server){
    server.get("/", { schema: listSchema }, categoryController.list);
    server.get("/:id", { schema: listProductsByCategoryIdSchema },categoryController.listProductsByCategoryId);
}