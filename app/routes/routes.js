const { verificar_chamados_todos, verificar_chamados_filtrados } = require('../controllers/verificar_chamados');

module.exports = {
  verificar_chamados_todos: (app) => {
    app.get('/', function (req, res) {
      verificar_chamados_todos(app, req, res);
    });
  },

  verificar_chamados_filtrados: (app) => {
    app.get('/filtrar', function (req, res) {
      verificar_chamados_filtrados(app, req, res);
    });
  }

}
