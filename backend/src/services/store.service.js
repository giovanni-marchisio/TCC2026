import { StoreRepository } from "../repositories/store.repository";
import { ConflictError, NotFoundError, ValidationError } from "../utils/errors";

const storeService = {
    async register(dados){
        // Preciso ver como vou verificar o link/caminho das imagens.
        validateProduct(dados);

        const categoria = await StoreRepository.verifyCategory(categoria);
        if (!categoria) throw new NotFoundError('Categoria não encontrada');
        
        return StoreRepository.register({...dados});
    },

    async modify(dados){
        const {
            id,
            imagem,
            nome,
            descricao,
            preco,
            categoria,
            estoque
        } = dados;

        const { qtd } = await StoreRepository.verifyCategory(id);
        if ( qtd < 0 ) throw new NotFoundError('Categoria não existe!');

        validateProduct({imagem, nome, descricao, preco, categoria, estoque});
        return StoreRepository.modify({...dados});
    },

    async registerCategory(dados){
        const { nome } = dados;
        const { qtd } = await StoreRepository.findCategoryByName(nome);
        if (qtd > 0 ) throw new ConflictError('Categoria já existe!');
        return StoreRepository.registerCategory({...dados});
    },

    async modifyCategory(dados){
        const {
            id,
            nome,
            imagem
        } = dados;

        const { qtd } = await StoreRepository.verifyCategory(id);
        if ( qtd < 0) throw new NotFoundError('Categoria não existe!');

        return StoreRepository.modifyCategory({...dados});

    },

    async delete(id){
        if (!StoreRepository.verifyProduct(id)) throw new NotFoundError('Produto não existe!');

        return StoreRepository.delete(id);
    },

    async restore(id){
        if (!StoreRepository.verifyProduct(id)) throw new NotFoundError('Produto não existe!');

        return StoreRepository.restore(id);
    },

    async listAll(){
        return StoreRepository.listAll();
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

export { storeService };