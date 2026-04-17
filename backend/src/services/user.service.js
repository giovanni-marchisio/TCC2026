import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';
import { validateEmail } from '../utils/emailUtils';
import { ConflictError, ValidationError, NotFoundError, UnauthorizedError } from '../utils/errors';

const userService = {
    // Ainda preciso resolver o problema de colocar uma conta com CPF repetido.
    // Talvez criar uma função para verificar CPF no repository seja uma boa ?
    async register(dados) {

        await validateEmail(dados.email);
        
        const { qtd_email } = await UserRepository.searchByEmail(dados.email);
        if (qtd_email > 0) {
            throw new ConflictError('Email já cadastrado!');
        }

        const { qtd_cpf } = await UserRepository.searchByCpf(dados.cpf);
        if (qtd_cpf > 0) {
            throw new ConflictError('ERROR'); // Acho que colocar algo como "CPF já cadastro"
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
        // Acho melhor verificar isso antes de tudo.
        if (!user.ativo) throw new UnauthorizedError('Conta desativada');

        if (!user) throw new NotFoundError('Email ou senha inválidos!') // Não sei se modifico o erro aqui.. 
        const password = await bcrypt.compare(senha, user.senha_hash);
        if (!password) throw new ValidationError('Email ou senha inválidos!');


        return { id: user.id, perfil: user.perfil, nome: user.nome };
    },

    async delete(id) {
        const { qtd } = await UserRepository.searchById(id);
        
        if (qtd === 0 ){
            throw new NotFoundError('Usuário não encontrado')
        }

        return UserRepository.delete(id);
    },

    async restore(id){
        const user = await UserRepository.searchById(id);

        if (!user) throw new NotFoundError('Usuário não existe!');

        if (user.ativo) throw new ConflictError('Usuário já está ativo!');

        return UserRepository.restore(id);
    }
}

export { userService };
