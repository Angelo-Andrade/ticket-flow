module.exports = {
    getUser: (dbConn, user) => {
        return new Promise ((resolve, reject) => {
            const sql = `SELECT * FROM usuario u 
                            JOIN posto_grad p ON p.id_posto_grad = u.id_posto_grad
                            WHERE u.email = ? LIMIT 1`;
    
            dbConn.query(sql, [user], (error, result) => {
                if(error) {
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
                callback(error, null);
            } else {
                callback(null, result);
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
                callback(error, null); 
            } else {
                callback(null, result);
            }
        });
    }
}


