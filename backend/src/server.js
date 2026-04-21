import 'dotenv/config';
import './configs/env';

import fastify from "fastify";
import { userRoutes } from "./routes/user.routes";
import fjwt from '@fastify/jwt';
import { storeRoutes } from './routes/store.routes';

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
    prefix: "/api"
});

server.register(storeRoutes, {
    prefix: "/api/produto"
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