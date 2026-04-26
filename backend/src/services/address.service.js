import { addressRepository } from "../repositories/address.repository";
import { userRepository } from "../repositories/user.repository";
import { NotFoundError } from "../utils/errors.utils";

export const addressService = {
    async register(user_id, dados){
        const { id } = await userRepository.findById(user_id);
        if (!id) throw new NotFoundError('Cliente não encontrado!');

        return addressRepository.register(id, dados);
    }
}