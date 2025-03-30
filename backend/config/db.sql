CREATE DATABASE sistema_login;
USE sistema_login;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    sobrenome VARCHAR(255) NOT NULL
);

CREATE TABLE notas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL,
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
/* ryuukyz: acho interessante nós colocarmos ON DELETE CASCADE nas chaves referenciadas,
    pq assim garante que se o usuario for excluido, suas tarefas e notas tbm serão */
/* ryuukyz: deixei um boolean de conclusão, caso quisermos adcionar um indicativo de que a tarefa ta em andamento ou concluida*/
CREATE TABLE tarefas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_conclusao DATETIME NOT NULL,
    concluida BOOLEAN DEFAULT FALSE,
    usuario_id INT,
    prioridade INT NOT NULL DEFAULT 3,
    importancia INT NOT NULL DEFAULT 3,
    complexidade INT NOT NULL DEFAULT 2,
    urgencia INT NOT NULL DEFAULT 3,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT,
    data_evento DATETIME NOT NULL,
    endereco VARCHAR(255) NOt NULL,
    concluida BOOLEAN DEFAULT FALSE,
    usuario_id INT,
    prioridade INT NOT NULL DEFAULT 3,
    duracao INT NOT NULL DEFAULT 1,
    importancia INT NOT NULL DEFAULT 3;
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);