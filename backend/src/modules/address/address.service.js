import { AddressRepository } from "./address.repository";
import { UserRepository } from "../user/user.repository";
import { verifyAddress } from "../../utils/address";

import { NotFoundError } from "../../utils/errors";

export const addressService = {
    async register(user_id, client_id, data){
        const user = await UserRepository.findById(user_id);

        if (!user) throw new NotFoundError("Usuário não encontrado!");

        return AddressRepository.register(client_id, data);
    },
    async delete(user_id, id){
        await verifyAddress(user_id, id);

        return AddressRepository.delete(id);
    },
    async restore(user_id, id){
        await verifyAddress(user_id, id);

        return AddressRepository.restore(id);
    },
    async modify(user_id, id, data){
        await verifyAddress(user_id, id);

        return AddressRepository.modify(id, data);
    },
    async list(user_id){
        const list = await AddressRepository.list(user_id);
        if (!list) throw new NotFoundError("Endereço não registrado!");
        
        return list;
    },
    async findById(user_id, id){
        await verifyAddress(user_id, id);
        const address = AddressRepository.findById(id);

        return {
            user_id :cliente_id,
            label :apelido,
            complement :complemento,
            street :logradouro,
            streetNumber :numero,
            neighborhood :bairro,
            city :cidade,
            state :uf,
            postalCode :cep,
            }
    },
    async setMain(user_id, id){
        await verifyAddress(user_id, id);
        
        return AddressRepository.setMain(user_id, id);
    },
};