import { ProductRepository } from "../repositories/product.repository";
import { CategoryRepository } from "../repositories/category.repository";
import { NotFoundError, ValidationError } from "../utils/errors.utils";

export const productService = {
        async register(dados){
            validateProduct(dados);

            const { categoria } = dados
    
            await CategoryRepository.findByName(categoria);
            if (!categoria) throw new NotFoundError('Categoria não encontrada');
            
            return ProductRepository.register({...dados});
        },
    
        async modify(id, dados){
            const { qtd } = await CategoryRepository.existsById(id);
            if ( qtd < 0 ) throw new NotFoundError('Categoria não existe!');
    
            validateProduct(dados);
            return ProductRepository.modify({...dados, id: id});
        },

    async delete(id){
        if (!ProductRepository.existsById(id)) throw new NotFoundError('Produto não existe!');

        return ProductRepository.delete(id);
    },

    async restore(id){
        if (!ProductRepository.existsById(id)) throw new NotFoundError('Produto não existe!');

        return ProductRepository.restore(id);
    },

    async list(){
        return ProductRepository.list();
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