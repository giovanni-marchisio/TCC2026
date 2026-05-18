import { AddressRepository } from "../modules/address/address.repository";
import { UserRepository } from "../modules/user/user.repository";

import { 
    ForbiddenError, 
    NotFoundError 
} from "./errors";
// Talvez uma função para validar o endereço também seja legal de ter, sla, feijão com farinha
export async function verifyAddress(user_id, address_id){
    const user = await UserRepository.findById(user_id);
    const address = await AddressRepository.findById(address_id);

    if (!user || !address) throw new NotFoundError("Cadastro de endereço não encontrado!");
    if (address.cliente_id != user.id) throw new ForbiddenError("Acesso negado");

    return true;
};