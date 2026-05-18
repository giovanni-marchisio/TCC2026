import { ProductRepository } from "./product.repository";
import { CategoryRepository } from "../category/category.repository";
import { productExist, validateProduct } from "../../utils/product";
import { categoryExist } from "../../utils/category";

import { 
    ConflictError, 
    NotFoundError, 
    ValidationError 
} from "../../utils/errors";

export const productService = {
    async register(data){
        const { name, category } = data;

        validateProduct(data);

        if (await productExist({ name: name })) throw new ConflictError("Produto já registrado!");
        if (!await categoryExist({ id: category })) throw new NotFoundError("Categoria não existe!");

        return ProductRepository.register(data);
    },
    async delete(id){
        if (!await productExist({ id: id })) throw new NotFoundError("Produto não existe!");
        
        return ProductRepository.delete(id);
    },
    async restore(id){
        if (!await productExist({ id: id })) throw new NotFoundError("Produto não existe!");
        
        return ProductRepository.restore(id); 
    },
    async modify(id, data){
        const { category } = data;
        
        validateProduct(data);

        if (!await productExist({ id: id })) throw new NotFoundError("Produto não encontrado!");
        if (!await categoryExist({ id: category })) throw new NotFoundError("Categoria não existe!");

        return ProductRepository.modify(id, data);
    },
    async list(name){
        if (name) return ProductRepository.searchByName(name);
        return ProductRepository.list();
    },
    async listAll(){
        return ProductRepository.listAll();
    },
    async findById(id){
        const product = await ProductRepository.findById(id);

        if (!product.ativo) throw new NotFoundError("Produto não encontrado!");

        return ProductRepository.findById(id);
    },

}