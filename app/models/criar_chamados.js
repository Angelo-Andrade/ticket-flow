module.exports = {
    criar_chamados: (dbConnection, descricao, urgencia, id_usuario, id_categoria_chamado, callback) => {
        // Obter a data e hora atual no formato MySQL
        const dataHoraAtual = new Date().toISOString().slice(0, 19).replace('T', ' ');

        // Criar a consulta SQL
        const sql = `INSERT INTO chamado 
                        (descricao, data_criacao, status_chamado, urgencia, id_usuario, id_categoria_chamado) 
                        VALUES (?, ?, 'aberto', ?, ?, ?);`; 
        console.log(sql);
        dbConnection.query(sql, [descricao, dataHoraAtual, urgencia, id_usuario, id_categoria_chamado], (error, results) => {
                if (error) {
                    console.error('Erro ao criar chamado:', error);
                    callback(error, null); 
                } else {
                    callback(null, results); 
                }
            }
        );
    },

    getCategoriaChamados: (dbConnection, callback) => {
        const sql = `SELECT * FROM categoria_chamado;`;
        console.log(sql);

        dbConnection.query(sql, (error, results) => {
            if (error) {
                console.error('Erro ao obter categorias:', error);
                callback(error, null);
            } else {
                callback(null, results);
            }
        });
    }
};
