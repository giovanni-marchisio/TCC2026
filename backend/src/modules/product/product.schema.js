const productBody = {
  type: "object",
  required: ["name", "price", "stock", "category"],
  properties: {
    name:         { type: "string", minLength: 3 },
    price:        { type: "integer", description: "Valor em centavos" },
    stock:        { type: "integer", minimum: 0 },
    category:     { type: "integer" },
    description:  { type: "string" },
  }
};

const productResponse = {
  type: "object",
  properties: {
    id:             { type: "integer" },
    name:           { type: "string" },
    image:          { type: "string" },
    imagem_medium:  { type: "string" },
    thumbnail:      { type: "string" },
    price:          { type: "integer"},
    description:    { type: "string" },
    category:       { type: "string" },
    category_id:    { type: "integer" },
    stock:          { type: "string" },
    active:         { type: "boolean" }

  }
};

export const listSchema = {
  description: "Lista todos os produtos ativos",
  tags: ["Produtos"],
    querystring: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Nome do produto"
      }
    }
  },
  response: {
    200: { type: "array", items: productResponse }
  }
};

export const listAllSchema = {
  description: "Lista todos os produtos ativos",
  tags: ["Produtos"],
  security: [{ bearerAuth: [] }],
  response: {
    200: { 
      type: "array", 
      items: {
        ...productResponse,
        properties: {
          ...productResponse.properties,
          ativo: { type: "boolean" }
        }
      } 
    }
  }
};

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
    404: { type: "object", properties: { errorr: { type: "string" } } }
  }
};

export const createSchema = {
  description: "Cria um novo produto",
  tags: ["Produtos"],
  security: [{ bearerAuth: [] }],
   body: productBody,
  response: {
    201: {
      type: 'object',
      properties: {
        message: { type: "string" },
        id: { type: "integer" }
      }
    }
  }
};

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
    200: { type: "object", properties: { message: { type: "string" } } },
    404: { type: 'object', properties: { error: { type: "string" } } }
  }
};

export const updateImageSchema = {
  description: "Atualiza imagem do produto",
  tags: ["Produtos"],
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "integer" }
    }
  },
  consumes: ["multipart/form-data"],
  security: [{ bearerAuth: [] }],
  body: {
    type: "object",
    required: ["image"],
    properties: {
      image: {
        type: "string",
        format: "binary"
      }
    }
  },
  response: {
    201: {
      type: "object",
      properties: {
        message: { type: "string" },
        affectedRows: { type: "integer" }
      }
    },
    404: {
      type: "object",
      properties: {
        message: { type: "string" },
        statusCode: { type: "integer" }
      }
    }
  }
};

export const restoreSchema = {
  description: "Restaura um produto desativado",
  tags: ["Produtos"],
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
};