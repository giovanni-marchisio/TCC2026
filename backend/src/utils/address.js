import { AddressRepository } from "../modules/address/address.repository";
import { UserRepository } from "../modules/user/user.repository";

import { 
    ForbiddenError, 
    NotFoundError 
} from "./errors";
// Talvez uma função para validar o endereço também seja legal de ter, sla, feijão com farinha
export async function verifyAddress(user_id, address_id){
    const user = await UserRepository.findById(user_id); // Essa função tava recebendo e mandando o mesmo id, sendo que eu queria o id do cliente... sou burrão, mané
    const address = await AddressRepository.findById(address_id);
    console.log(user, address);
    if (!user || !address) throw new NotFoundError("Cadastro de endereço não encontrado!");
    if (address.client_id != user.id) throw new ForbiddenError("Acesso negado");

    return true;
};