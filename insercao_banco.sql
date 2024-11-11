-- Insersões dos Postos e Graduações do Exército no sistema
INSERT INTO posto_grad (descricao) VALUES ('Soldado');
INSERT INTO posto_grad (descricao) VALUES ('Cabo');
INSERT INTO posto_grad (descricao) VALUES ('3º Sargento');
INSERT INTO posto_grad (descricao) VALUES ('2º Sargento');
INSERT INTO posto_grad (descricao) VALUES ('1º Sargento');
INSERT INTO posto_grad (descricao) VALUES ('Subtenente');
INSERT INTO posto_grad (descricao) VALUES ('Aspirante a Oficial');
INSERT INTO posto_grad (descricao) VALUES ('2º Tenente');
INSERT INTO posto_grad (descricao) VALUES ('1º Tenente');
INSERT INTO posto_grad (descricao) VALUES ('Capitão');
INSERT INTO posto_grad (descricao) VALUES ('Major');
INSERT INTO posto_grad (descricao) VALUES ('Tenente-Coronel');
INSERT INTO posto_grad (descricao) VALUES ('Coronel');
INSERT INTO posto_grad (descricao) VALUES ('General de Brigada');
INSERT INTO posto_grad (descricao) VALUES ('General de Divisão');
INSERT INTO posto_grad (descricao) VALUES ('General de Exército');
-- Insersões de usuários fictícios
INSERT INTO usuario (nome_completo, nome_guerra, email, tipo,
id_posto_grad)
VALUES
('João da Silva', 'Silva', 'joao.silva@example.com', 'admin', 3),
('Maria Souza', 'Souza', 'maria.souza@example.com', 'comum', 6),
('Carlos Pereira', 'Pereira', 'carlos.pereira@example.com', 'comum',
9),
('Joaquim Santos', 'Santos', 'joaquim.santos@example.com', 'comum',
4);
-- Inserções dos telefones dos usuários
INSERT INTO telefone (id_usuario, numero)
VALUES
(1, '+55 11 99999-9999'),
(2, '+55 21 88888-8888'),
(3, '+55 31 77777-7777'),
(4, '+55 12 55555-5555');
-- Inserções de dados de autenticação
INSERT INTO autenticacao (id_usuario, senha)
VALUES
(1, 'senhaJoao123'),
(2, 'senhaMaria456'),
(3, 'senhaCarlos789'),
(4, 'senhaJoaquim789');
-- Insersões dos tipos de chamado no sistema
INSERT INTO categoria_chamado (descricao) VALUES ('SPED');
INSERT INTO categoria_chamado (descricao) VALUES ('Acesso a
internet');
INSERT INTO categoria_chamado (descricao) VALUES ('Hardware');
INSERT INTO categoria_chamado (descricao) VALUES ('VOIP');
INSERT INTO categoria_chamado (descricao) VALUES ('VPN');
INSERT INTO categoria_chamado (descricao) VALUES ('Antivirus');
INSERT INTO categoria_chamado (descricao) VALUES ('Drive');
INSERT INTO categoria_chamado (descricao) VALUES ('Outros');
-- Popular a tabela de chamados
INSERT INTO chamado (descricao, data_criacao, status_chamado, urgencia, id_usuario, id_categoria_chamado) 
VALUES 
('Trocar contas do SPED Comandante', '2024-01-12 10:30:00', 'aberto', 'alta', 1, 1),
('Conexão de internet intermitente', '2024-02-15 10:30:00', 'em andamento', 'media', 2, 2),
('Falha na placa-mãe do computador', '2024-03-25 10:30:00', 'fechado', 'alta', 3, 3),
('Problema na configuração do VOIP', '2024-01-15 11:30:00', 'aberto', 'baixa', 1, 4),
('Acesso à VPN bloqueado', NOW(), 'em andamento', 'alta', 2, 5),
('Antivirus não está atualizado', NOW(), 'fechado', 'media', 3, 6),
('Drive de rede inacessível', NOW(), 'aberto', 'media', 1, 7),
('Outros problemas gerais reportados', NOW(), 'em andamento', 'baixa', 2, 8),
('Erro na validação do SPED Contábil', '2024-01-15 10:30:00', 'fechado', 'alta', 1, 1),
('Conexão de internet muito lenta', '2024-02-10 14:20:00', 'aberto', 'media', 2, 2),
('Monitor não liga', '2024-03-05 09:00:00', 'em andamento', 'alta', 3, 3),
('VOIP não faz chamadas externas', '2024-03-22 16:45:00', 'cancelado', 'baixa', 1, 4),
('VPN desconectando frequentemente', '2024-04-01 11:15:00', 'aberto', 'alta', 2, 5),
('Falha na instalação do Antivirus', '2024-04-10 08:50:00', 'em andamento', 'media', 3, 6),
('Drive de rede está cheio', '2024-05-03 13:30:00', 'fechado', 'alta', 1, 7),
('Problemas na inicialização do sistema', '2024-05-17 15:05:00', 'aberto', 'baixa', 2, 8),
('Erro ao importar dados para o SPED', '2024-06-01 12:40:00', 'em andamento', 'media', 1, 1),
('Internet sem conexão após atualização', '2024-06-15 09:25:00', 'fechado', 'alta', 2, 2),
('Problema de aquecimento no hardware', '2024-07-01 17:10:00', 'aberto', 'alta', 3, 3),
('Chamadas VOIP caindo constantemente', '2024-07-07 14:55:00', 'em andamento', 'media', 1, 4),
('Conexão VPN não autentica', '2024-07-10 10:30:00', 'fechado', 'alta', 2, 5),
('Antivirus detectando falso positivo', '2024-07-15 08:15:00', 'cancelado', 'baixa', 3, 6),
('Falha ao mapear o drive de rede', '2024-07-20 13:45:00', 'aberto', 'media', 1, 7),
('Erro no sistema de relatórios', '2024-07-25 11:20:00', 'fechado', 'alta', 2, 8),
('SPED Fiscal não está validando', '2024-07-28 16:35:00', 'em andamento', 'alta', 1, 1),
('Queda de internet em vários setores', '2024-07-30 09:50:00', 'cancelado', 'baixa', 2, 2),
('Hardware não reconhece o periférico', NOW(), 'aberto', 'media', 3, 3),
('Problemas na rede VOIP interna', NOW(), 'fechado', 'alta', 1, 4);
