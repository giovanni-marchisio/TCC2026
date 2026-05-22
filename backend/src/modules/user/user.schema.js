const userResponse = {
  type: "object",
  properties: {
    id:            { type: "integer" },
    email:         { type: "string" },
    perfil:        { type: "string" },
    nome:          { type: "string" },
    telefone:      { type: "string" },
    cpf:           { type: "string" },
    data_cadastro: { type: "string" },
    ativo:         { type: "boolean" }
  }
}

export const registerSchema = {
  description: "Cadastra um novo usuário",
  tags: ["Usuários"],
  body: {
    type: "object",
    required: ["name", "email", "password", "phone", "cpf"],
    properties: {
      name:     { type: "string", minLength: 3 },
      email:    { type: "string", format: "email" },
      password:    { type: "string", minLength: 6 },
      phone: { type: "string" },
      cpf:      { type: "string" }
    }
  },
  response: {
    201: {
      type: "object",
      properties: {
        message:   { type: "string" },
        user_id: { type: "integer" }
      }
    }
  }
}

export const loginSchema = {
  description: "Realiza o login",
  tags: ["Usuários"],
  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string", format: "email" },
      password: { type: "string" }
    }
  },
  response: {
    200: {
      type: "object",
      properties: {
        token: { type: "string" },
        name:  { type: "string" },
        id:    { type: "integer"}
      }
    }
  }
}

export const profileSchema = {
  description: "Retorna o perfil do usuário logado",
  tags: ["Usuários"],
  security: [{ bearerAuth: [] }],
  response: {
    200: userResponse,
    404: { type: "object", properties: { error: { type: "string" } } }
  }
}

// export const modifySchema