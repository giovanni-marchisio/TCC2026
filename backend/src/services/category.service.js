import { CategoryRepository } from "../repositories/category.repository";
import { NotFoundError, ConflictError } from "../utils/errors.utils";

export const categoryService = {
    async register(dados){
        const { nome } = dados;
        const { qtd } = await CategoryRepository.findByName(nome);
        if (qtd > 0 ) throw new ConflictError('Categoria já existe!');
        return CategoryRepository.register({...dados});
    },

    async modify(id, dados){
        const { qtd } = await CategoryRepository.existsById(id);
        if ( qtd < 0) throw new NotFoundError('Categoria não existe!');

        return CategoryRepository.modify({...dados, id: id});

    },    
}