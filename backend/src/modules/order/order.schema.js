const orderItemResponse = {
  type: "object",
  properties: {
    produto_id: { type: "integer" },
    produto:    { type: "string" },
    quantidade: { type: "integer" },
    preco_unit: { type: "integer" },
    subtotal:   { type: "integer" }
  }
}

const orderResponse = {
  type: "object",
  properties: {
    id:          { type: "integer" },
    status:      { type: "string" },
    total:       { type: "integer" },
    criado_em:   { type: "string" },
    cliente:     { type: "string" },
    logradouro:  { type: "string" },
    numero:      { type: "string" },
    cidade:      { type: "string" },
    uf:          { type: "string" },
    itens: {
      type: "array",
      items: orderItemResponse
    }
  }
}

export const createOrderSchema = {
  description: "Cria um novo pedido",
  tags: ["Pedidos"],
  security: [{ bearerAuth: [] }],
  body: {
    type: "object",
    required: ["address_id", "items", "payment_method"],
    properties: {
      address_id:     { type: "integer" },
      payment_method: { type: "string",
        enum: [ "pix", "cartao", "boleto"]
       },
      items: {
        type: "array",
        items: {
          type: "object",
          required: ["product_id", "quantity"],
          properties: {
            product_id: { type: "integer" },
            quantity: { type: "integer", minimum: 1 }
          }
        }
      }
    }
  },
  response: {
    201: {
      type: "object",
      properties: {
        orderId: { type: "integer" },
        total:   { type: "integer" }
      }
    }
  }
}

export const findAllOrderSchema = {
  description: "Lista todos os pedidos do usuário logado",
  tags: ["Pedidos"],
  security: [{ bearerAuth: [] }],
  response: {
    200: { type: "array", items: orderResponse }
  }
}

export const findByIdOrderSchema = {
  description: "Busca um pedido pelo ID",
  tags: ["Pedidos"],
  security: [{ bearerAuth: [] }],
  params: {
    type: "object",
    properties: { id: { type: "integer" } }
  },
  response: {
    200: orderResponse,
    404: { type: "object", properties: { error: { type: "string" } } }
  }
}

export const updateOrderStatusSchema = {
  description: "Atualiza o status de um pedido",
  tags: ["Pedidos"],
  security: [{ bearerAuth: [] }],
  params: {
    type: "object",
    properties: { id: { type: "integer" } }
  },
  body: {
    type: "object",
    required: ["status"],
    properties: {
      status: {
        type: "string",
        enum: ["pendente", "pago", "enviado", "entregue", "cancelado"]
      }
    }
  },
  response: {
    200: { type: "object", properties: { message: { type: "string" } } }
  }
}