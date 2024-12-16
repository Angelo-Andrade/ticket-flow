DROP SCHEMA IF EXISTS ticketflow;
CREATE SCHEMA ticketflow;
USE ticketflow;

CREATE TABLE posto_grad (
    id_posto_grad INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(100) NOT NULL
);

CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(100) NOT NULL,
    nome_guerra VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    tipo ENUM('admin', 'comum') NOT NULL,
    id_posto_grad INT,
        FOREIGN KEY (id_posto_grad) REFERENCES
        posto_grad(id_posto_grad)
);

CREATE TABLE categoria_chamado (
    id_categoria_chamado INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(100) NOT NULL
);

CREATE TABLE chamado (
    id_chamado INT AUTO_INCREMENT PRIMARY KEY,
    descricao TEXT NOT NULL,
    data_criacao DATETIME NOT NULL, -- Colocar para automático
    status_chamado ENUM('aberto', 'em andamento', 'fechado',
    'cancelado') NOT NULL,
    urgencia ENUM('baixa', 'media', 'alta') NOT NULL,
    id_usuario INT,
    id_categoria_chamado INT,
        FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
        FOREIGN KEY (id_categoria_chamado) REFERENCES
        categoria_chamado(id_categoria_chamado)
);
