import bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { validateEmail } from '../../utils/email';

import 
{ 
    ConflictError, 
    NotFoundError, 
    ValidationError, 
    UnauthorizedError 
} from '../../utils/errors';

export const userService = {
    async register(data){
        const { email, password } = data;

        await validateEmail(email);

        const userExist = await UserRepository.findByEmail(email);

        if (userExist) throw new ConflictError("Email já cadastrado!");

        const hashPassword = await bcrypt.hash(password, 10);

        return UserRepository.register({...data, password: hashPassword});
    },
    async login(data){
        const { email, password } = data;
        
        const user = await UserRepository.findByEmail(email);
        if (!user) throw new ValidationError("Email ou senha inválidos!");

        const pass = await bcrypt.compare(password, user.senha_hash);
        if (!pass) throw new ValidationError("Email ou senha inválidos!");

        if (!user.ativo) throw new UnauthorizedError("Conta desativada!");

        return {
            id: user.id,
            client_id: user.cliente_id,
            type: user.perfil,
            active: user.ativo,
            name: user.nome
        };
    },
    async delete(id){
        const userExist = await UserRepository.findById(id);
        if (!userExist) throw new NotFoundError("Usuário não encontrado!");

        return UserRepository.delete(id);
    },
    async restore(id){
        const user = await UserRepository.findById(id);
        if (!user) throw new NotFoundError("Usuário não encontrado!");
        if (user.ativo) throw new ConflictError("Usuário já está ativo!");

        return UserRepository.restore(id);
    },
    async modify(id, data){
        const { phone } = data;
        // Estou fazendo os schema pro swagger e ainda não sei o que colocar aqui...
        return UserRepository.modify(id, data);
    },
    async list(){
        return UserRepository.list();
    },
    async profile(id){
        const user = await UserRepository.findById(id);
        if (!user) throw new NotFoundError("Usuário não encontrado!");
        return user;
    },

}