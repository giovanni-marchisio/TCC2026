import "dotenv/config";
import "./configs/env";

import cors from "@fastify/cors";
import fastify from "fastify";
import fjwt from "@fastify/jwt";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { userRoutes } from "./modules/user/user.routes";
import { passwordRoutes } from "./modules/password/password.routes";
import { productRoutes } from "./modules/product/product.routes";
import { categoryRoutes } from "./modules/category/category.routes";
import { addressRoutes } from "./modules/address/address.routes";
import { orderRoutes } from "./modules/order/order.routes";
import { paymentRoutes } from "./modules/payment/payment.routes";

import { userAdminRoutes } from "./modules/user/user.admin.routes";
import { productAdminRoutes } from "./modules/product/product.admin.routes";
import { categoryAdminRoutes } from "./modules/category/category.admin.routes";
import { orderAdminRoutes } from "./modules/order/order.admin.routes";
import { paymentAdminRoutes } from "./modules/payment/payment.admin.routes";

const server = fastify();

server.register(cors, {
    origin: [process.env.FRONT_URL, process.env.LOCAL_TEST].filter(Boolean),
    method: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-type", "Authorization"]
});

server.setErrorHandler((error, request, reply) => {
    const status = error.statusCode || 500;
    const msg = error.message || "Erro interno do servidor!";

    console.log(`Error: ${msg}\n Status: ${status}`);

    return reply.status(status).send();
});


server.register(fjwt, {
    secret: process.env.JWT_SECRET
});

server.register(swagger, {
  openapi: {
    info: {
      title: "TCC Backend - 2026",
      description: "Documentação da API do e-commerce",
      version: "1.0.0"
    },

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  }
});

server.register(swaggerUi, {
  routePrefix: "/docs"
});

server.register(productAdminRoutes, {
    prefix: "/api/admin/produto"
});

server.register(categoryAdminRoutes, {
    prefix: "/api/admin/categoria"
});

server.register(userAdminRoutes, {
    prefix: "/api/admin/usuario"
});

server.register(orderAdminRoutes, {
    prefix: "/api/admin/pedidos"
});

server.register(paymentAdminRoutes, {
    prefix: "/api/admin/pagamentos"
});

//

server.register(userRoutes, {
    prefix: "/api/usuario"
});

server.register(passwordRoutes, {
    prefix: "/api/senha"
})

server.register(addressRoutes , {
    prefix: "/api/usuario/endereco"
});

server.register(productRoutes, {
    prefix: "/api/produto"
});

server.register(categoryRoutes, {
    prefix: "/api/categoria"
});

server.register(orderRoutes, {
    prefix: "/api/pedidos"
});

server.register(paymentRoutes, {
    prefix: "/api/pagamentos"
});


server.listen({
    port: 3000
}, (err) => {
    if (err) {
        console.log(`Erro ao iniciar servidor.\n
        ${err}`);
        process.exit(1);
    }

    console.log("Servidor em execução")
});