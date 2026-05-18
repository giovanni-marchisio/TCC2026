import { categoryService } from "./category.service";

export const categoryController = {
    async register(request, reply){
        const data = request.body;
        const { category_id } = await categoryService.register(data);
        console.log(category_id);
        return reply.status(201).send({
            message: "Categoria criada!",
            id: category_id
        });
    },
    async delete(request, reply){
       const { id } = request.params;
       const { affectedRows } = await categoryService.delete(id);

       return reply.status(200).send({
            id: id,
            affectedRows: affectedRows
       });
    },
    async restore(request, reply){
        const { id } = request.params;
        const { affectedRows } = await categoryService.restore(id);

        return reply.status(200).send({
            id: id,
            affectedRows: affectedRows
        });
    },
    async modify(request, reply){
        const { id } = request.params;
        const data = request.body;
        const { affectedRows } = await categoryService.modify(id, data);

        return reply.status(200).send({
            id: id,
            affectedRows: affectedRows
        });
        
    },
    async list(request, reply){
        const { name } = request.query;
        const list = await categoryService.list(name);

        return reply.status(200).send(
            list
        );
    },
    async listAll(request, reply){
        const list = await categoryService.listAll();

        return reply.status(200).send(
            list
        );
    },
    async findById(request, reply){
        const { id } = request.params;
        const response = await categoryService.findById(id);

        return reply.status(200).send(
            response
        );
    },
}