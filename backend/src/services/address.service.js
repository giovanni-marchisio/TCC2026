import { addressRepository } from "../repositories/address.repository";
import { userRepository } from "../repositories/user.repository";
import { ForbiddenError, NotFoundError } from "../utils/errors.utils";

export const addressService = {
    async register(user_id, dados){
        const { id } = await userRepository.findById(user_id);
        if (!id) throw new NotFoundError('Cliente não encontrado!');

        return addressRepository.register(id, dados);
    },

    async modify(cliente_id, id, dados){
        const client = await userRepository.findById(cliente_id);
        
        const address = await addressRepository.findById(id);
        if (!address) throw new NotFoundError('Endereço não encontrado!');

        if (address.cliente_id !== client.id) throw new ForbiddenError('Acesso negado!');

        return addressRepository.modify(id, dados);
    }
}