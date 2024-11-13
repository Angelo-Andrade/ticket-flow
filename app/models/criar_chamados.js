module.exports = {
    criar_chamados: (dbConnection, descricao, urgencia, id_categoria_chamado, callback) => {
        // Obter a data e hora atual no formato MySQL
        const dataHoraAtual = new Date().toISOString().slice(0, 19).replace('T', ' ');

        // Criar a consulta SQL
        const sql = `INSERT INTO chamado 
                        (descricao, data_criacao, status_chamado, urgencia, id_usuario, id_categoria_chamado) 
                        VALUES ('${descricao}', '${dataHoraAtual}', 'aberto', '${urgencia}', 2, '${id_categoria_chamado}');`;
        console.log(sql);
        dbConnection.query(sql, callback);     
    },

    getCategoriaChamados: (dbConnection, callback) => {
        const sql = `SELECT * FROM categoria_chamado;`;
        console.log(sql);
        dbConnection.query(sql, callback); 
    }
}
