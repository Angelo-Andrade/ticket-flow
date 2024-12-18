module.exports = {
    excluir_chamado: (dbConnection, id_chamado, callback) => {

        const sql = `UPDATE chamado
               SET status_chamado = 'cancelado'
               WHERE id_chamado = ?`;
        console.log(sql);
        dbConnection.query(sql, [id_chamado], (error, results) => {
                if (error) {
                    console.error('Erro ao excluir chamado:', error);
                    callback(error, null); 
                } else {
                    callback(null, results); 
                }
            }
        );
    },
}