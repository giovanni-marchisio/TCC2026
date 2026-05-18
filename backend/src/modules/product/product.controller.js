import { productService } from "./product.service";

export const productController = {
    async register(request, reply){
        const data = request.body;
        const { id, affectedRows } = await productService.register(data);

        return reply.status(201).send({
            message: "Produto registrado!", 
            id: id, 
            affectedRows
        });
    },
    async delete(request, reply){
        const { id } = request.params;
        const { affectedRows } = await productService.delete(id);

        return reply.status(200).send({
            message: "Produto deletado!",
            id: id,
            affectedRows: affectedRows
        });
    },
    async restore(request, reply){
        const { id } = request.params;
        const { affectedRows } = await productService.restore(id);

        return reply.status(200).send({
            message: "Produto restaurado!",
            id,
            affectedRows
        });
    },
    async modify(request, reply){
        const { id } = request.params;
        const { data } = request.body;
        const { affectedRows } = await productService.modify(id, data);

        return reply.status(200).send({
            message: "Produto modificado!",
            id: id,
            affectedRows: affectedRows
        });
    },
    async list(request, reply){
        const { name } = request.query;
        const list = await productService.list(name);

        return reply.status(200).send(
            list
        );
    },
    async listAll(request, reply){
        const list = await productService.listAll();

        return reply.status(200).send(
            list
        );
    },
    async findById(request, reply){
        const { id } = request.params;
        const product = await productService.findById(id);

        return reply.status(200).send(
            product
        );
    },
}