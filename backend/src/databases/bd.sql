CREATE DATABASE loja;

USE  loja;


CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(150) UNIQUE,
    email_confirmado TINYINT DEFAULT 1,
    senha_hash VARCHAR(255),
    perfil ENUM('admin', 'cliente') DEFAULT 'cliente',
    data_cadastro DATETIME DEFAULT NOW()
);

CREATE TABLE cliente (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT UNIQUE,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    cpf VARCHAR(14) NOT NULL UNIQUE,

    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

CREATE TABLE endereco(
    id INT PRIMARY KEY AUTO_INCREMENT,
    cliente_id INT NOT NULL,
    apelido VARCHAR(50), -- Ai nóis vai ter que pensar em como implementar isso, talvez deixar opcional seja ok
    complemento VARCHAR(20),
    logradouro VARCHAR(150),
    numero VARCHAR(100),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    uf CHAR(2),
    cep CHAR(9),
    endereco_principal BOOLEAN DEFAULT FALSE,

    FOREIGN KEY (cliente_id) REFERENCES cliente(id)
);

CREATE TABLE categoria (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) UNIQUE,
    imagem VARCHAR(255) NOT NULL
);

CREATE TABLE produto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    imagem VARCHAR(255) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255),
    preco DECIMAL(10, 2) NOT NULL,
    categoria_id INT NOT NULL,
    estoque INT NOT NULL,

    FOREIGN KEY (categoria_id) REFERENCES categoria(id)
);


CREATE TABLE pedido (
    id  INT PRIMARY KEY AUTO_INCREMENT,
    cliente_id INT NOT NULL,
    endereco_id INT NOT NULL,
    status ENUM('pendente', 'pago', 'enviado', 'entregue', 'cancelado'),
    data_pedido DATETIME DEFAULT NOW(),
    valor_total DECIMAL(10, 2),

    FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    FOREIGN KEY (endereco_id) REFERENCES endereco(id)
);

CREATE TABLE pedido_produto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pedido_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,

    FOREIGN KEY (pedido_id) REFERENCES pedido(id),
    FOREIGN KEY (produto_id) REFERENCES produto(id)
);

CREATE TABLE pagamento (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pedido_id INT NOT NULL UNIQUE,
    -- metodo ENUM('cartao', 'pix', boleto), Não sei como vamos implementar isso, já que não vai ter api de pagamento
    status ENUM('pendente', 'aprovado', 'recusado'),
    valor DECIMAL(10, 2),
    pago_em DATETIME,

    FOREIGN KEY (pedido_id) REFERENCES pedido(id)
);

