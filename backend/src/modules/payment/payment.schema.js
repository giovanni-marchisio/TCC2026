const paymentResponse = {
  type: "object",
  properties: {
    id:            { type: "integer" },
    pedido_id:     { type: "integer" },
    metodo:        { type: "string" },
    status:        { type: "string" },
    valor:         { type: "integer" },
    pago_em:       { type: "string", nullable: true },
    status_pedido: { type: "string" },
    cliente:       { type: "string" }
  }
}

export const findPaymentByOrderSchema = {
  description: "Busca o pagamento de um pedido",
  tags: ["Pagamentos"],
  security: [{ bearerAuth: [] }],
  params: {
    type: "object",
    properties: { pedido_id: { type: "integer" } }
  },
  response: {
    200: paymentResponse,
    404: { type: "object", properties: { erro: { type: "string" } } }
  }
};

export const listPaymentSchema = {
  description: "Lista todos os pagamentos",
  tags: ["Pagamentos"],
  security: [{ bearerAuth: [] }],
  querystring: {
    type: "object",
    properties: {
      status: {
        type: "string",
        enum: ["pendente", "aprovado", "recusado", "estornado"]
      }
    }
  },
  response: {
    200: { type: "array", items: paymentResponse }
  }
};

export const findAllPaymentSchema = {
  description: "Lista todos os pagamentos",
  tags: ["Pagamentos"],
  security: [{ bearerAuth: [] }],
  querystring: {
    type: "object",
    properties: {
      status: {
        type: "string",
        enum: ["pendente", "aprovado", "recusado", "estornado"]
      }
    }
  },
  response: {
    200: { type: "array", items: paymentResponse }
  }
}

export const updatePaymentStatusSchema = {
  description: "Atualiza o status de um pagamento",
  tags: ["Pagamentos"],
  security: [{ bearerAuth: [] }],
  params: {
    type: "object",
    properties: { pedido_id: { type: "integer" } }
  },
  body: {
    type: "object",
    required: ["status"],
    properties: {
      status: {
        type: "string",
        enum: ["pendente", "aprovado", "recusado", "estornado"]
      }
    }
  },
  response: {
    200: { type: "object", properties: { mensagem: { type: "string" } } }
  }
};