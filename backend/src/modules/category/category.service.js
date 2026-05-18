import { CategoryRepository } from "./category.repository";
import { categoryExist } from "../../utils/category";

import { 
    NotFoundError, 
    ConflictError 
} from "../../utils/errors";

export const categoryService = {
    async register(data){
        const { name } = data;
        
        if (await categoryExist({name: name})) throw new ConflictError("Categoria já existe!");

        return CategoryRepository.register(data);
    },
    async delete(id){
        if (!await categoryExist({id: id})) throw new NotFoundError("Categoria não encontrada!");

        return CategoryRepository.delete(id);
    },
    async restore(id){
        if (!await categoryExist({id: id})) throw new NotFoundError("Categoria não encontrada!");

        return CategoryRepository.restore(id);
    },
    async modify(id, data){
        if (!await categoryExist({id: id})) throw new NotFoundError("Catgoria não encontrada!");

        return CategoryRepository.modify(id, data);
    },
    async list(name){
        if (name) return CategoryRepository.searchByName(name);
        
        const list = await CategoryRepository.list();
        if (!list) throw new NotFoundError;

        return list;
    },
    async listAll(){
        const list = await CategoryRepository.listAll();
        if (!list) throw new NotFoundError;

        return list;        
    },
    async findById(id){
        const category = await CategoryRepository.findById(id);
        if (!category) throw new NotFoundError("Categoria não encontrada!");
        
        return category;
    }
}