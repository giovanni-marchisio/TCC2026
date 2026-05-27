const userResponse = {
  type: "object",
  properties: {
    id:            { type: "integer" },
    email:         { type: "string" },
    type:        { type: "string" },
    name:          { type: "string" },
    phone:      { type: "string" },
    created_at: { type: "string" },
    active:         { type: "boolean" }
  }
};

export const registerSchema = {
  description: "Cadastra um novo usuário",
  tags: ["Usuários"],
  body: {
    type: "object",
    required: ["name", "email", "password", "phone"],
    properties: {
      name:     { type: "string", minLength: 3 },
      email:    { type: "string", format: "email" },
      password:    { type: "string", minLength: 6 },
      phone: { type: "string" },
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
};

export const deleteSchema = {
  description: "Deleta o usuário",
  tags: ["Usuários"],
  security: [{ bearerAuth: [] }],
  params: {
    type: "object",
    properties: { id: { type: "integer" } }
  },
   response: {
    200: { type: "object", properties: { message: { type: "string" } } },
    404: { type: "object", properties: { error: { type: "string" } } }
  }
};

export const restoreSchema = {
  description: "Deleta o usuário",
  tags: ["Usuários"],
  security: [{ bearerAuth: [] }],
  params: {
    type: "object",
    properties: { id: { type: "integer" } }
  },
   response: {
    200: { type: "object", properties: { message: { type: "string" } } },
    404: { type: "object", properties: { error: { type: "string" } } }
  }
};

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
        id:    { type: "string"},
        type:  { type: "string"},
        client_id: { type: "string" }
      }
    }
  }
};

export const profileSchema = {
  description: "Retorna o perfil do usuário logado",
  tags: ["Usuários"],
  security: [{ bearerAuth: [] }],
  response: {
    200: userResponse,
    404: { type: "object", properties: { error: { type: "string" } } }
  }
};

// export const modifySchema