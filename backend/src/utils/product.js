import { ProductRepository } from "../modules/product/product.repository";

import { ValidationError } from "./errors";

export function validateProduct(data){
    const {
        name,
        price,
        stock,
        category,
        image
    } = data;

    if (!name || name.trim() === "") throw new ValidationError("Nome do produto é obrigatório!");
    if (!price || price <= 0) throw new ValidationError("Preço inválido!");
    if (stock < 0) throw new ValidationError("Quantidade inválida no estoque");
    if (!category) throw new ValidationError("Categoria é obrigatória!");
    
    if (image){
        const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
        const extension = image.slice(image.lastIndexOf('.')).toLowerCase();

        if (!allowedExtensions.includes(extension)) throw new ValidationError("Formato de imagem inválido!");
    }
};

export async function productExist({id, name} = {}){
    if (id){
        const product = await ProductRepository.findById(id);

        return !!product;
    };

    if (name){
        const product = await ProductRepository.findByName(name);

        return !!product;
    };

    return false;
};