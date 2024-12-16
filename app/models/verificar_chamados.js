module.exports = {
  verificar_chamados_todos: (dbConnection, callback) => {
    console.log("[Model verificar_chamados]");
    const sql = `SELECT 
                    c.id_chamado, 
                    c.descricao AS descricao_chamado, 
                    c.data_criacao, 
                    c.status_chamado, 
                    c.urgencia, 
                    p.descricao AS descricao_posto_grad, 
                    u.nome_guerra, 
                    cat_c.descricao AS descricao_categoria 
                FROM 
                    chamado c 
                JOIN 
                    categoria_chamado cat_c ON cat_c.id_categoria_chamado = c.id_categoria_chamado 
                JOIN 
                    usuario u ON u.id_usuario = c.id_usuario
                JOIN 
                    posto_grad p ON p.id_posto_grad = u.id_posto_grad
                ORDER BY 
                  c.status_chamado ASC,
                  c.data_criacao ASC;`;

    dbConnection.query(sql, callback);
  },

  verificar_chamados_filtrados: (dbConnection, filter, filter_value, callback) => {
    console.log("[Model verificar_chamados]");
    const sql = `SELECT 
                    c.id_chamado, 
                    c.descricao AS descricao_chamado, 
                    c.data_criacao, 
                    c.status_chamado, 
                    c.urgencia, 
                    p.descricao AS descricao_posto_grad, 
                    u.nome_guerra, 
                    cat_c.descricao AS descricao_categoria 
                FROM 
                    chamado c 
                JOIN 
                    categoria_chamado cat_c ON cat_c.id_categoria_chamado = c.id_categoria_chamado 
                JOIN 
                    usuario u ON u.id_usuario = c.id_usuario
                JOIN 
                    posto_grad p ON p.id_posto_grad = u.id_posto_grad
                WHERE
                  ${filter} LIKE '%${filter_value}%'
                ORDER BY 
                  c.status_chamado ASC,
                  c.data_criacao ASC;`;
                  
    dbConnection.query(sql, callback);
  }
}
