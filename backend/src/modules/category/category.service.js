import { CategoryRepository } from "./category.repository";
import { categoryExist } from "../../utils/category";

import { 
    NotFoundError, 
    ConflictError 
} from "../../utils/errors";
import { deleteFile, moveFile } from "../../utils/file";

const baseUrl = `${process.env.FRONTEND_URL}${process.env.PUBLIC_ASSETS}`;

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
        if (name) {
            const list = await CategoryRepository.searchByName(name);

            return list.map(({ 
            id, 
            nome, 
            imagem, 
            imagem_thumb }) => ({
            id,
            name: nome,
            image: `${baseUrl}categories/${imagem}`,
            thumbnail: `${baseUrl}categories/${imagem_thumb}`
        }));  
        }
        
        const list = await CategoryRepository.list();
        if (!list) throw new NotFoundError;

        return list.map(({ 
            id, 
            nome, 
            imagem, 
            imagem_thumb }) => ({
            id,
            name: nome,
            image: `${baseUrl}categories/${imagem}`,
            thumbnail: `${baseUrl}categories/${imagem_thumb}`
        }));  
    },
    async listAll(){
        const list = await CategoryRepository.listAll();
        if (!list) throw new NotFoundError;
        
        return list.map(({ 
            id, 
            nome, 
            ativo, 
            imagem, 
            imagem_thumb }) => ({
            id,
            name: nome,
            active: ativo,
            image: `${baseUrl}categories/${imagem}`,
            thumbnail: `${baseUrl}categories/${imagem_thumb}`
        }));    
    }, // Acho que essa função foi um erro.... mas agora vai ficar aqui.
    async listProductsByCategoryId(id){
        if (!await categoryExist({ id: id })) throw new NotFoundError("Categoria não encontrada!");
        const list = await CategoryRepository.listProductsByCategoryId(id);
        
        return list.map(({
          id,
          nome,
          imagem_thumb,
          imagem,
          imagem_medium,
          descricao,
          preco,
          categoria,
          estoque,
          ativo}) => ({
          id,
          name: nome,
          thumbnail: `${baseUrl}products/${imagem_thumb}`,
          image: `${baseUrl}products/${imagem}`,
          image_medium:`${baseUrl}products/${imagem_medium}`,
          description: descricao,
          price: preco,
          category_name: categoria,
          stock: estoque,
          active: ativo
          }));
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