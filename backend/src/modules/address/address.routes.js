import { addressController } from "./address.controller";
import { authenticate } from "../../middlewares/auth";

export async function addressRoutes(server){
    server.addHook("preHandler", authenticate);

    server.get("/", addressController.list);
    server.get("/:id", addressController.findById);
    server.post("/", addressController.register);
    server.delete("/:id", addressController.delete);
    server.patch("/restaurar/:id", addressController.restore)
    server.patch("/:id", addressController.modify);
    server.patch("/principal/:id", addressController.setMain);
}