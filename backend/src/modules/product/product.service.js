import { database } from "../../configs/database";

import { ProductRepository } from "./product.repository";
import { CategoryRepository } from "../category/category.repository";
import { productExist, validateProduct } from "../../utils/product";
import { categoryExist } from "../../utils/category";
import { deleteFile, moveFile } from "../../utils/file";

import { 
    ConflictError, 
    NotFoundError, 
    ValidationError 
} from "../../utils/errors";

export const productService = {
    async register(data){ 
        validateProduct(data);

        return ProductRepository.register(data);
    },
    async delete(id){
        if (!await productExist({ id: id })) throw new NotFoundError("Produto não existe!");
        
        return ProductRepository.delete(id, database);
    },
    async restore(id){
        if (!await productExist({ id: id })) throw new NotFoundError("Produto não existe!");
        
        return ProductRepository.restore(id); 
    },
    async modify(id, data){
        await validateProduct(data);
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
    async updateImage(id, image, filePath){
        if (!await productExist({ id: id })) throw new NotFoundError("Produto não existe!");
        // Preciso pensar em como verificar se o produto já tem imagem
        // e como deletar sem dar problema no front...
        if (filePath === process.env.TEMP_FOLDER + image) {
            const productFolder = `${process.env.PUBLIC_ASSETS}products/`;
            await moveFile(filePath, productFolder, image)
        };

        return ProductRepository.updateImage(id, image);
    }
}