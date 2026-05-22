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
        if (!await productExist({ id: id })) {
            throw new NotFoundError("Produto não existe!");
            return;
        }
        const product = await ProductRepository.findById(id);
        const images = {
            large: {
                filename: image.large,
                filepath: filePath.large
            },
            medium: {
                filename: image.medium,
                filepath: filePath.medium
            },
            thumb: {
                filename: image.thumb,
                filepath: filePath.thumb
            }
        };

        if (filePath && image) {
            const productFolder = `${process.env.PUBLIC_ASSETS}products/`;
            await Promise.all(
                Object.values(images).map(
                    async (img) => {
                        await moveFile(
                            img.filepath,
                            productFolder,
                            img.filename
                        )
                    }
                )
            );

            if (product.imagem && product.imagem_medium && product.imagem_thumb){
                const oldImages = {
                    large: {
                        filepath: `${productFolder}${product.imagem}`
                    },
                    medium: {
                        filepath: `${productFolder}${product.imagem_medium}`
                    },
                    thumb: {
                        filepath: `${productFolder}${product.imagem_thumb}`
                    }
                };
                // eu poderia talvez modificar as funções para aceitar objeto e fazer esse processo
                // fora do service...
                await Promise.all(
                    Object.values(oldImages).map(
                        async (img) => {
                            await deleteFile(img.filepath);
                        }
                    )
                );
            }
        };

        return ProductRepository.updateImage(
            id, 
            images.large.filename, 
            images.thumb.filename, 
            images.medium.filename
        );
    }
}