export const requestResetSchema = {
  description: "Solicita recuperação de senha por email",
  tags: ["Senha"],
  body: {
    type: "object",
    required: ["email"],
    properties: {
      email: { type: "string", format: "email" }
    }
  },
  response: {
    200: { type: "object", properties: { mensagem: { type: "string" } } }
  }
}

export const resetPasswordSchema = {
  description: "Redefine a senha com o token recebido por email",
  tags: ["Senha"],
  body: {
    type: "object",
    required: ["token", "new_password"],
    properties: {
      token:        { type: "string" },
      new_password: { type: "string", minLength: 6 }
    }
  },
  response: {
    200: { type: "object", properties: { mensagem: { type: "string" } } }
  }
}