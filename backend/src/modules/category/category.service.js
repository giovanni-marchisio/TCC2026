import { CategoryRepository } from "./category.repository";
import { categoryExist } from "../../utils/category";

import { 
    NotFoundError, 
    ConflictError 
} from "../../utils/errors";
import { deleteFile, moveFile } from "../../utils/file";

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
        if (!await categoryExist({ id: id })) throw new NotFoundError("Categoria não encontrada!");

        return category;
    },
    async updateImage(id, image, filePath){
        if (!await categoryExist({ id: id })) {
            throw new NotFoundError("Categoria não encontrada!");
            return;
        }
        const category = await CategoryRepository.findById(id);
        const images = {
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
            const categoryFolder = `${process.env.PUBLIC_ASSETS}categories/`;
            await deleteFile(filePath.large);
            await Promise.all(
                Object.values(images).map(
                    async (img) => {
                        await moveFile(
                            img.filepath,
                            categoryFolder,
                            img.filename
                        )
                    }
                )
            );
            
            if (category.imagem && category.imagem_thumb){
                const oldImages = {
                    medium: {
                        filepath: `${categoryFolder}${category.imagem}`
                    },
                    thumb: {
                        filepath: `${categoryFolder}${category.imagem_thumb}`
                    }
                };
                
                await Promise.all(
                    Object.values(oldImages).map(
                        async (img) => {
                            await deleteFile(img.filepath);
                        }
                    )
                );                                
            }
        }
        return CategoryRepository.updateImage(
            id, 
            images.medium.filename,
            images.thumb.filename
        );
    }
}