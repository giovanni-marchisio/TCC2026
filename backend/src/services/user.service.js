import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';
import { validateEmail } from '../utils/emailUtils';
import { ConflictError, ValidationError, NotFoundError, UnauthorizedError } from '../utils/errors';

const userService = {
    // Sou r*tardado, tenho que verificar o CPF aqui!!
    async register(dados) {

        await validateEmail(dados.email);
        
        const { qtd } = await UserRepository.searchByEmail(dados.email);
        if (qtd > 0) {
            throw new ConflictError('Email já cadastrado!');
            return; // Por algum motivo sem return aqui o bd pula um ID
        }

        const { qtd_cpf } = await UserRepository.searchByCpf(dados.cpf);
        if (qtd_cpf > 0) {
            throw new ConflictError('ERROR'); 
            return;                 // Acho que colocar algo como "CPF já cadastro"
                                    // é errado, já que pode facilitar alguém a descobrir
                                    // informações que não deveria. (eu acho), mas vou deixar essa verificação aqui
        }

        const hashPassword = await bcrypt.hash(dados.senha, 10);

        // faz o spread dos dados e adiciona a senha hash
        return UserRepository.register({...dados, senha_hash: hashPassword})
    },

    async login(dados){
        const { email, senha} = dados;

        const user = await UserRepository.findByEmail(email);

        if (!user) throw new NotFoundError('Email ou senha inválidos!');
        if (!user.ativo) throw new UnauthorizedError('Conta desativada');

        const password = await bcrypt.compare(senha, user.senha_hash);
        if (!password) throw new ValidationError('Email ou senha inválidos!');


        return { id: user.id, perfil: user.perfil, nome: user.nome };
    },

    async delete(id) {
        const { qtd } = await UserRepository.searchById(id);
        
        if (qtd === 0 ) throw new NotFoundError('Usuário não encontrado');

        return UserRepository.delete(id);
    },

    async restore(id){
        const user = await UserRepository.searchById(id);

        if (!user) throw new NotFoundError('Usuário não existe!');

        if (user.ativo) throw new ConflictError('Usuário já está ativo!');

        return UserRepository.restore(id);
    },

    async listAll(){
        const list = await UserRepository.listAll();

        return list;
    }
}

export { userService };
