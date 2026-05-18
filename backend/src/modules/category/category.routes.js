import { categoryController } from "./category.controller"

export async function categoryRoutes(server){
    server.get("/", categoryController.list);
    server.get("/:id", categoryController.findById);
}