import dns from "dns/promises";

import nodemailer from "nodemailer";

export async function validateEmail(email){
    const validFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!validFormat) {
        throw new Error("Formato de email inválido");
    };

    const domain = email.split('@')[1];
    
    try {
        await dns.resolveMx(domain);
    } catch {
        throw new Error("Domínio do email não existe");
    };
};

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// brabo pra caramba esse tal de ethereal.
// só não posso esquecer de trocar o test pelo email real **
// ** lembrar lembrar ok ok**
async function createTransporter() {

    const testAccount = await nodemailer.createTestAccount()

    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
  }


export async function sendPasswordReset(email, link){
    const test = await createTransporter();

    const info = await test.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Recuperação de senha!",
        html:`
      <p>Você solicitou a recuperação de senha.</p>
      <p>Clique no link abaixo para redefinir sua senha:</p>
      <a href="${link}">Redefinir senha</a>
      <p>O link expira em 1 hora.</p>        
        `
    })
    // esse console.log também não pode ficar aqui, zé!!! LEMBRE LEMBRE DETIRAR
    console.log('Email de teste:', nodemailer.getTestMessageUrl(info))

};

export async function sendOrderConfirmation(email, order_id, total) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Pedido #${order_id} confirmado`,
    html: `
      <p>Seu pedido foi recebido com sucesso!</p>
      <p>Número do pedido: #${order_id}</p>
      <p>Total: R$ ${(total / 100).toFixed(2)}</p>
    `
  })
};

export async function sendPaymentConfirmation(email, order_id) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Pagamento do pedido #${order_id} aprovado`,
    html: `
      <p>Seu pagamento foi aprovado!</p>
      <p>Número do pedido: #${order_id}</p>
      <p>Em breve seu pedido será enviado.</p>
    `
  })
};