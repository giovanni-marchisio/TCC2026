const categoryItem = {
  type: "object",
  properties: {
    id:            { type: "integer" },
    name:          { type: "string" },
    active:        { type: "boolean" },
    image:         { type: "string"},
    thumbnail:     { type: "string" },
  }
};

const categoryBody = {
  type: "object",
  required: ["name"],
  properties: {
    name: { type: "string" }
  }
};

export const registerSchema = {
  description: "Cria uma nova categoria",
  tags: ["Categorias"],
  security: [{ bearerAuth: [] }],
  body: categoryBody,
  response: {
    201: {
      type: "object",
      properties: {
        message: { type: "string" },
        id: { type: "integer" }
      }
    }
  }
};

export const deleteSchema = {
  description: "Deleta uma categoria (soft delete)",
  tags: ["Categorias"],
  security: [{ bearerAuth: [] }],
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "integer" }
    }
  },
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "integer" },
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
  description: "Restaura uma categoria deletada",
  tags: ["Categorias"],
  security: [{ bearerAuth: [] }],
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "integer" }
    }
  },
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "integer" },
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

export const modifySchema = {
  description: "Atualiza os dados de uma categoria",
  tags: ["Categorias"],
  security: [{ bearerAuth: [] }],
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "integer" }
    }
  },
  body: categoryBody,
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "integer" },
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

export const listSchema = {
  description: "Lista categorias ativas",
  tags: ["Categorias"],
  querystring: {
    type: "object",
    properties: {
      name: { type: "string" }
    }
  },
  response: {
    200: {
      type: "array",
      items: categoryItem
    }
  }
};

export const listAllSchema = {
  description: "Lista todas as categorias",
  tags: ["Categorias"],
  security: [{ bearerAuth: [] }],
  response: {
    200: {
      type: "array",
      items: categoryItem
    }
  }
};

export const listProductsByCategoryIdSchema = {
  description: "Retorna produtos de uma categoria",
  tags: ["Categorias"],
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "integer" }
    }
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id:            { type: "integer" },
          name:          { type: "string" },
          thumbnail:     { type: "string" },
          image_medium:  { type: "string"},
          image:         { type: "string" },
          description:   { type: "string" },
          price:         { type: "number" },
          category_name: { type: "string" },
          stock:         { type: "integer" },    
        }
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

export const updateImageSchema = {
  description: "Atualiza imagem da categoria",
  tags: ["Categorias"],
  security: [{ bearerAuth: [] }],
  consumes: ["multipart/form-data"],
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "integer" }
    }
  },
  body: {
    type: "object",
    required: ["image"],
    properties: {
      image: { type: "string", format: "binary" }
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