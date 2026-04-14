import dns from 'dns/promises';

async function validateEmail(email) {

    const validFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!validFormat) {
        throw new Error('Formato de email inválido');
    }

    const domain = email.split('@')[1];
    
    try {
        await dns.resolveMx(domain);
    } catch {
        throw new Error('Domínio do email não existe');
    }
}

export { validateEmail };