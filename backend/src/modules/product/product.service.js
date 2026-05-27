import { database } from "../../configs/database";

import { ProductRepository } from "./product.repository";
import { CategoryRepository } from "../category/category.repository";
import { productExist, validateProduct } from "../../utils/product";
import { categoryExist } from "../../utils/category";
import { deleteFile, moveFile } from "../../utils/file";
import { existsSync } from 'fs';

import {
    ConflictError,
    NotFoundError,
    ValidationError
} from "../../utils/errors";

const baseUrl = `${process.env.FRONTEND_URL}${process.env.PUBLIC_ASSETS}products/`;

export const productService = {
    async register(data) {
        validateProduct(data);

        return ProductRepository.register(data);
    },
    async delete(id) {
        if (!await productExist({ id: id })) throw new NotFoundError("Produto não existe!");

        return ProductRepository.delete(id, database);
    },
    async restore(id) {
        if (!await productExist({ id: id })) throw new NotFoundError("Produto não existe!");

        return ProductRepository.restore(id);
    },
    async modify(id, data) {
        await validateProduct(data);
        if (!await productExist({id: id})) throw new NotFoundError("Produto não existe!");
        return ProductRepository.modify(id, data);
    },
    async list(name) {
        if (name) {
            const list = await ProductRepository.searchByName(name);
            return list.map(({
                id,
                nome,
                imagem,
                imagem_medium,
                imagem_thumb,
                descricao,
                preco,
                categoria,
                categoria_id,
                estoque,
                ativo
            }) => ({
                id,
                name: nome,
                image: `${baseUrl}${imagem}`,
                image_medium: `${baseUrl}${imagem_medium}`,
                thumbnail: `${baseUrl}${imagem_thumb}`,
                price: preco,
                description: descricao,
                category: categoria,
                category_id: categoria_id,
                stock: estoque,
                active: ativo
            }));

        };

        const list = await ProductRepository.list();

        return list.map(({
            id,
            nome,
            imagem,
            imagem_medium,
            imagem_thumb,
            descricao,
            preco,
            categoria,
            categoria_id,
            estoque,
            ativo
        }) => ({
            id,
            name: nome,
            image: `${baseUrl}${imagem}`,
            image_medium: `${baseUrl}${imagem_medium}`,
            thumbnail: `${baseUrl}${imagem_thumb}`,
            price: preco,
            description: descricao,
            category: categoria,
            category_id: categoria_id,
            stock: estoque,
            active: ativo
        }));
    },
    async listAll() {
        const list = ProductRepository.listAll();

        return list.map(({ 
            id, 
            nome, 
            imagem,
            imagem_medium,
            imagem_thumb,
            descricao,
            preco,
            categoria,
            categoria_id,
            estoque,
            ativo
             }) => ({
            id,
            name: nome,
            image: `${baseUrl}${imagem}`,
            image_medium: `${baseUrl}${imagem_medium}`,
            thumbnail: `${baseUrl}${imagem_thumb}`,
            price: preco,
            description: descricao,
            category: categoria,
            category_id: categoria_id,
            stock: estoque,
            active: ativo
        })); 
    },
    async findById(id) {
        const {
            id: productId,
            nome,
            imagem,
            imagem_medium,
            imagem_thumb,
            descricao,
            preco,
            categoria,
            categoria_id,
            estoque,
            ativo
        } = await ProductRepository.findById(id);
        if (!product.ativo) throw new NotFoundError("Produto não encontrado!");

        return {
            id: productId,
            name: nome,
            image: `${baseUrl}${imagem}`,
            image_medium: `${baseUrl}${imagem_medium}`,
            thumbnail: `${baseUrl}${imagem_thumb}`,
            description: descricao,
            price: preco,
            category: categoria,
            category_id: categoria_id,
            stock: estoque,
            active: ativo
        }
    },
    async updateImage(id, image, filePath) {
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

            if (product.imagem && product.imagem_medium && product.imagem_thumb) {
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
                            if (existsSync(img.filepath)) {
                                await deleteFile(img.filepath);
                            }
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