const { reject } = require("bcrypt/promises");

module.exports = {
    getUserByEmail: (dbConn, user) => {
        return new Promise ((resolve, reject) => {
            const sql = `SELECT * FROM usuario u 
                            JOIN posto_grad p ON p.id_posto_grad = u.id_posto_grad
                            WHERE u.email = ? LIMIT 1`;
    
            dbConn.query(sql, [user], (error, result) => {
                if(error) {
                    return reject(error); // 
                }
                resolve(result); 
            });
        }) 
    },

    getUserById: (dbConn, id) => {
        return new Promise ((resolve, reject) => {
            const sql = `SELECT * FROM usuario u 
                            JOIN posto_grad p ON p.id_posto_grad = u.id_posto_grad
                            WHERE u.id_usuario = ?`;
    
            dbConn.query(sql, [id], (error, result) => {
                if(error) {
                    return reject(error); // 
                }
                resolve(result); 
            });
        }) 
    },

    getUsers: (dbConn, callback) => {
        const sql = `SELECT * FROM usuario u 
                            JOIN posto_grad p ON p.id_posto_grad = u.id_posto_grad
                            WHERE status_usuario = 'ativo'
                            ORDER BY nome_completo ASC;`;

        dbConn.query(sql, (error, result) => {
            if (error) {
                return callback(error, null);
            } 
            callback(null, result);
        });
    },

    insertNewUser: (dbConn, nome_completo, nome_guerra, telefone, email, senha, tipo, id_posto_grad, callback) => {
        const sql = `INSERT INTO usuario 
        (nome_completo, nome_guerra, telefone, email, senha, tipo, id_posto_grad) 
        VALUES 
        (?, ?, ?, ?, ?, ?, ?);`

        dbConn.query(sql, [nome_completo, nome_guerra, telefone, email, senha, tipo, id_posto_grad], (error, result) => {
            if (error) {
                return callback(error, null); 
            } 
            callback(null, result);
        });
    },

    getPostoGrad: (dbConn) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM posto_grad;`;
    
            dbConn.query(sql, (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result);
            });
        });
    },
    
    updateUser: (dbConn, id, name, war_name, phone, email, hash, type, id_posto_grad) => {
        console.log('[Model usuarios] atualizar usuário');
        return new Promise((resolve, reject) => {
            const sql = `UPDATE usuario 
                            SET nome_completo = ?, nome_guerra = ?, telefone = ?, email = ?, tipo = ?, id_posto_grad = ?
                            WHERE id_usuario = ?;`;

            dbConn.query(sql, [name, war_name, phone, email, type, id_posto_grad, id], (error, result) => {
                console.log('[Model usuarios] mudando dados do usuário');
                if (error) {
                    return reject(error);
                }
                
                if (hash) {
                    console.log('[Model usuários] mudando senha: ', hash);
                    const updateHash = `UPDATE usuario SET senha = ? WHERE id_usuario = ?;`;
                    dbConn.query(updateHash, [hash, id], (error, result) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(result);
                    });
                } else {
                    return resolve(result);
                }
            });
                            
        });
    },

    deactivateUser: (dbConn, id) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE usuario SET status_usuario = 'desativado' WHERE id_usuario = ?;";
            dbConn.query(sql, [id], (error, result) => {
                console.log(error, result);
                if(error) {
                    return reject(error);
                }
                return resolve(result);
            });
        });
    }
}

/*
 id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(100) NOT NULL,
    nome_guerra VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    tipo ENUM('admin', 'comum') NOT NULL,
    status_usuario ENUM('ativo', 'desativado') NOT NULL,
    id_posto_grad INT,
        FOREIGN KEY (id_posto_grad) REFERENCES
        posto_grad(id_posto_grad)





        */

