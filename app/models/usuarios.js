module.exports = {
    getUser: (dbConn, user, password, callback) => {
        return new Promise ((resolve, reject) => {
            const sql = `SELECT * FROM usuario u 
                            JOIN posto_grad p ON p.id_posto_grad = u.id_posto_grad
                            WHERE u.email = ? AND u.senha = ? LIMIT 1`;
    
            dbConn.query(sql, [user, password], (error, result) => {
                if(error) {
                    console.error('Erro ao carregar dados:', error);
                    reject(error); // 
                }
                resolve(result); 
            });
        }) 
    },

    getUsers: (dbConn, callback) => {
        const sql = `SELECT * FROM usuarios ORDER BY ASC;`;

        dbConn.query(sql, (error, result) => {
            if (error) {
                console.error('Erro ao carregar dados:', error);
                callback(error, null); // Devolver erro para o callback
            } else {
                callback(null, result); // Chamar callback com sucesso
            }
        });
    },

    insertNewUser: (dbConn, nome_completo, nome_guerra, telefone, email, senha, tipo, id_posto_grad, callback) => {
        const sql = `INSERT INTO usuarios 
        (nome_completo, nome_guerra, telefone, email, senha, tipo, id_posto_grad) 
        VALUES 
        (?, ?, ?, ?, ?, ?, ?);`

        dbConn.querry(sql, [nome_completo, nome_guerra, telefone, email, senha, tipo, id_posto_grad], (error, result) => {
            if (error) {
                console.error('Erro ao fazer inserção:', error);
                callback(error, null); 
            } else {
                callback(null, result);
            }
        });
    }
}


