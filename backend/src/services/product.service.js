import { productRepository } from "../repositories/product.repository";
import { categoryRepository } from "../repositories/category.repository";
import { ConflictError, NotFoundError, ValidationError } from "../utils/errors.utils";

export const productService = {
        async register(dados){
            validateProduct(dados);

            const { categoria, nome } = dados
            const { qtd } = await productRepository.existsByName(nome);
            
            if (qtd > 0) throw new ConflictError('Produto já registrado!');

            await categoryRepository.findByName(categoria);
            if (!categoria) throw new NotFoundError('Categoria não encontrada');
            
            return productRepository.register(dados); // tinha esquecido de tirar o spread
        },
    
        async modify(id, dados){

            const { qtd } = await categoryRepository.existsById(id);
            if ( qtd < 0 ) throw new NotFoundError('Categoria não existe!');

            validateProduct(dados);
            return productRepository.modify(id, dados);
        },

    async delete(id){
        if (!productRepository.existsById(id)) throw new NotFoundError('Produto não existe!');

        return productRepository.delete(id);
    },

    async restore(id){
        if (!productRepository.existsById(id)) throw new NotFoundError('Produto não existe!');

        return productRepository.restore(id);
    },

    async list(){
        return productRepository.list();
    },

    async listAll(){
        return productRepository.listAll();
    }
}

function validateProduct(dados){
    const {
        nome,
        preco,
        estoque,
        categoria,
        imagem
    } = dados;

    if (!nome || nome.trim() === "") throw new ValidationError('Nome do produto é obrigatório.');

    if (!preco || preco <= 0) throw new ValidationError('Preço deve ser maior que zero.');

    if (estoque < 0) throw new ValidationError('Estoque não pode ser negativo.');

    if (!categoria) throw new ValidationError('Categoria é obrigatório.');

    if (imagem){
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
        const extension = imagem.slice(imagem.lastIndexOf('.')).toLowerCase();

        if (!allowedExtensions.includes(extension)) throw new ValidationError('Imagem deve ser JPEG, JPG, PNG ou WEBP.');
    }
}