import { StoreRepository } from "../repositories/store.repository";

const storeService = {
    async register(dados){
        // Preciso ver como vou verificar o link/caminho das imagens.
        return StoreRepository.register({...dados});
    },

    async registerCategory(dados){
        return StoreRepository.registerCategory({...dados});
    },

}

export { storeService };