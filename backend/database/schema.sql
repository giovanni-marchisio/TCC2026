CREATE DATABASE ecommerce_tcc
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE ecommerce_tcc;

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(150) UNIQUE,
    email_confirmado TINYINT DEFAULT 1,
    senha_hash VARCHAR(255),
    perfil ENUM('admin', 'cliente') DEFAULT 'cliente',
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE cliente (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT UNIQUE,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    cpf VARCHAR(14) NOT NULL UNIQUE,

    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

CREATE TABLE recuperacao_senha (
  id         INT PRIMARY KEY AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  token      VARCHAR(255) UNIQUE,
  expira_em  DATETIME NOT NULL,
  usado      BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

CREATE TABLE endereco(
    id INT PRIMARY KEY AUTO_INCREMENT,
    cliente_id INT NOT NULL,
    apelido VARCHAR(50),
    complemento VARCHAR(20),
    logradouro VARCHAR(150),
    numero VARCHAR(100),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    uf CHAR(2),
    cep CHAR(9),
    endereco_principal BOOLEAN DEFAULT FALSE,
    ativo BOOLEAN DEFAULT TRUE,

    FOREIGN KEY (cliente_id) REFERENCES cliente(id)
);

CREATE TABLE categoria (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) UNIQUE,
    ativo BOOLEAN DEFAULT TRUE,
    imagem VARCHAR(255) DEFAULT NULL,
    imagem_thumb VARCHAR(255) DEFAULT NULL
);

CREATE TABLE produto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255),
    preco INT NOT NULL,
    categoria_id INT NOT NULL,
    estoque INT NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    imagem VARCHAR(255) DEFAULT NULL,
    imagem_thumb VARCHAR(255) DEFAULT NULL,
    imagem_medium VARCHAR(255) DEFAULT NULL,

    FOREIGN KEY (categoria_id) REFERENCES categoria(id)
);


CREATE TABLE pedido (
    id  INT PRIMARY KEY AUTO_INCREMENT,
    cliente_id INT NOT NULL,
    endereco_id INT NOT NULL,
    status ENUM('pendente', 'pago', 'enviado', 'entregue', 'cancelado'),
    data_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    valor_total INT NOT NULL,

    FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    FOREIGN KEY (endereco_id) REFERENCES endereco(id)
);

CREATE TABLE pedido_produto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pedido_id INT NOT NULL,
    produto_id INT NOT NULL,
    preco_unit INT NOT NULL,
    quantidade INT NOT NULL,
    subtotal INT NOT NULL,

    FOREIGN KEY (pedido_id) REFERENCES pedido(id),
    FOREIGN KEY (produto_id) REFERENCES produto(id)
);

CREATE TABLE pagamento (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pedido_id INT NOT NULL UNIQUE,
    metodo ENUM('cartao', 'pix', 'boleto'),
    status ENUM('pendente', 'aprovado', 'recusado', 'estornado'),
    valor INT NOT NULL,
    pago_em DATETIME,

    FOREIGN KEY (pedido_id) REFERENCES pedido(id)
);

