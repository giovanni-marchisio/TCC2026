import { categoryRepository } from "../repositories/category.repository";
import { NotFoundError, ConflictError } from "../utils/errors.utils";

export const categoryService = {
    async register(dados){
        const { nome } = dados;
        const { qtd } = await categoryRepository.findByName(nome);
        if (qtd > 0 ) throw new ConflictError('Categoria já existe!');
        return categoryRepository.register({...dados});
    },

    async modify(id, dados){
        const { qtd } = await categoryRepository.existsById(id);
        if ( qtd < 0) throw new NotFoundError('Categoria não existe!');

        return categoryRepository.modify(id, dados);

    },
    
    async delete(id){
        const category = await categoryRepository.existsById(id);
        if (!category) throw new NotFoundError('Categoria não existe.');

        return categoryRepository.delete(id);
    },

    async restore(id){
        const category = await categoryRepository.existsById(id);
        if (!category) throw new NotFoundError('Categoria não existe.');

        return categoryRepository.restore(id);
    },

    async list(){
        return categoryRepository.list();
    },

    async listAll(){
        return categoryRepository.listAll();
    }
}