import 'dotenv/config';
import './configs/env';

import fastify from "fastify";
import fjwt from '@fastify/jwt';

import { userRoutes } from "./routes/user.routes";
import { productRoutes } from './routes/products.routes';
import { categoryRoutes } from './routes/category.routes';
import { addressRoutes } from './routes/address.routes';

const server = fastify();

server.setErrorHandler((error, request, reply) => {
    const status = error.statusCode || 500;
    const msg = error.message || 'Erro interno do servidor!';

    console.log(`Error: ${msg}\n Status: ${status}`);

    return reply.status(status).send();
})

server.register(fjwt, {
    secret: process.env.JWT_SECRET
})

server.register(userRoutes, {
    prefix: "/api/usuario"
});

server.register(productRoutes, {
    prefix: "/api/produto"
});

server.register(categoryRoutes, {
    prefix: "/api/categoria"
});

server.register(addressRoutes, {
    prefix: '/api/usuario/endereco'
});

server.get("/health", async (request, reply) => {
        return { status: "OK" };
})

server.listen({
    port: 3000
}, (err) => {
    if (err) {
        console.log(`Erro ao iniciar servidor.\n
        ${err}`);
        process.exit(1);
    }

    console.log("Servidor em execução")
})