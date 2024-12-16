const dbConnection = require("../../config/dbConnection");
const { getUser, getUsers } = require('../models/usuarios.js');

module.exports.render_conectar = (app, req, res) => {
    console.log('[Controller usuarios] abrindo tela login');
    res.render('conectar.ejs', {error: null});
}

module.exports.autenticar = async (app, req, res) => {
    console.log('[Controller usuarios] autenticando usuario');
    try {
        dbConn = dbConnection();
        const { email, password } = req.body;
        const user = await getUser(dbConn, email, password, (error, result) =>{
            if (error) {
                console.error('Erro na consulta:', error);
                return res.status(500).render('notfound.ejs', {
                    errorMessage: 'Erro ao buscar chamados: ' + error.sqlMessage
                });
            }   
        });
        if(user.length < 1) {
            console.log(user);
            console.log('[Controller usuarios] autenticação falhou');
            return res.status(500).render('conectar.ejs', { error: true });
        } else {
            console.log('[Controller usuarios] usuário autenticado');
            req.session.user = {
                id: user.id_usuario,
                complete_name: user.nome_completo, 
                war_name: user.nome_guerra,
                telefone: user.telefone,
                email: user.email,
                user_type: user.tipo,
                grad_post: user.descricao 
            };
            console.log('[Controller usuarios] Req session', req.session);
            res.redirect('/');
        }
    }
    catch (error) {
        console.log('[Controller usuarios] problema de consulta no banco ' + error);
        return res.status(500).render('notfound.ejs', {
            errorMessage: 'Erro na busca no banco: ' + error.sqlMessage
        });
    }
    finally {
      if(dbConn) dbConnection.closeConnection(dbConn);
    }
}

module.exports.desconectar = (app, req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return res.redirect('/');
        }
        res.redirect('/usuario/conectar');
    });
}