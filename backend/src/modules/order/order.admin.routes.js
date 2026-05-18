import { autorize } from "../../middlewares/auth";
import { orderController } from "./order.controller";

import { updateOrderStatusSchema } from "./order.schema";

export async function orderAdminRoutes(server){
    // server.get("/pedidos", orderController.list); não sei se faço aqui ou crio algo separado
    // edit* Talvez eu nem precise fazer nada aqui já que no pagamento tem uma que faz algo parecido..
    // sla feijão com farinha, macarrão com sarxixa to tempo demais refazendo isso sla sla
    // E TAMBÉM TEM UMA ROTA QUE FAZ O MESMO QUE ESSA AAAAAA. 
    // ser burro é foda.
    server.patch("/:id/status", { schema: updateOrderStatusSchema }, orderController.updateStatus);

}