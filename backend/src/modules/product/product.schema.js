const productBody = {
  type: "object",
  required: ["nome", "preco", "estoque", "categoria_id"],
  properties: {
    nome:         { type: "string", minLength: 3 },
    preco:        { type: "integer", description: "Valor em centavos" },
    estoque:      { type: "integer", minimum: 0 },
    categoria_id: { type: "integer" },
    descricao:    { type: "string" },
    imagem:       { type: "string" }
  }
}

const productResponse = {
  type: "object",
  properties: {
    id:        { type: "integer" },
    nome:      { type: "string" },
    preco:     { type: "integer" },
    estoque:   { type: "integer" },
    descricao: { type: "string" },
    imagem:    { type: "string" },
    categoria: { type: "string" }
  }
}

export const findAllSchema = {
  description: "Lista todos os produtos ativos",
  tags: ["Produtos"],
  response: {
    200: { type: "array", items: productResponse }
  }
}

export const findByIdSchema = {
  description: "Busca um produto pelo ID",
  tags: ["Produtos"],
  params: {
    type: "object",
    properties: {
      id: { type: "integer" }
    }
  },
  response: {
    200: productResponse,
    404: { type: "object", properties: { erro: { type: "string" } } }
  }
}

export const createSchema = {
  description: "Cria um novo produto",
  tags: ["Produtos"],
  security: [{ bearerAuth: [] }],
  body: productBody,
  response: {
    201: {
      type: 'object',
      properties: {
        mensagem: { type: "string" },
        id: { type: "integer" }
      }
    }
  }
}

export const updateSchema = {
  description: "Atualiza um produto",
  tags: ["Produtos"],
  security: [{ bearerAuth: [] }],
  params: {
    type: "object",
    properties: { id: { type: "integer" } }
  },
  body: productBody,
  response: {
    200: { type: "object", properties: { mensagem: { type: "string" } } }
  }
}

export const deleteSchema = {
  description: "Desativa um produto",
  tags: ["Produtos"],
  security: [{ bearerAuth: [] }],
  params: {
    type: "object",
    properties: { id: { type: "integer" } }
  },
  response: {
    204: { type: "null" }
  }
}