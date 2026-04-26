import bcrypt from 'bcrypt';
import { userRepository } from '../repositories/user.repository';
import { validateEmail } from '../utils/email.utils';
import { ConflictError, ValidationError, NotFoundError, UnauthorizedError } from '../utils/errors.utils';

export const userService = {
    async register(dados) {

        await validateEmail(dados.email);
        
        const { qtd } = await userRepository.searchByEmail(dados.email);
        if (qtd > 0) {
            throw new ConflictError('Email já cadastrado!');
            return; // Por algum motivo sem return aqui o bd pula um ID
        }

        const { qtd_cpf } = await userRepository.searchByCpf(dados.cpf);
        if (qtd_cpf > 0) {
            throw new ConflictError('ERROR'); 
            return;                 // Acho que colocar algo como "CPF já cadastro"
                                    // é errado, já que pode facilitar alguém a descobrir
                                    // informações que não deveria. (eu acho), mas vou deixar essa verificação aqui
        }

        const hashPassword = await bcrypt.hash(dados.senha, 10);

        // faz o spread dos dados e adiciona a senha hash
        return userRepository.register({...dados, senha_hash: hashPassword})
    },

    async login(dados){
        const { email, senha} = dados;

        const user = await userRepository.findByEmail(email);

        if (!user) throw new NotFoundError('Email ou senha inválidos!');
        if (!user.ativo) throw new UnauthorizedError('Conta desativada');

        const password = await bcrypt.compare(senha, user.senha_hash);
        if (!password) throw new ValidationError('Email ou senha inválidos!');


        return { id: user.id, perfil: user.perfil, nome: user.nome };
    },

    async delete(id) {
        const { qtd } = await userRepository.searchById(id);
        
        if (qtd === 0 ) throw new NotFoundError('Usuário não encontrado');

        return userRepository.delete(id);
    },

    async restore(id){
        const user = await userRepository.searchById(id);

        if (!user) throw new NotFoundError('Usuário não existe!');
        if (user.ativo) throw new ConflictError('Usuário já está ativo!');

        return userRepository.restore(id);
    },

    async modify(id, dados){
        const { telefone, senha } = dados;

        if (senha) {
            dados.senha_hash = await bcrypt.hash(senha, 10);
            delete dados.senha;
        }

        return userRepository.modify(id, dados);
    },

    async list(){
        const list = await userRepository.list();

        return list;
    },
    
}

