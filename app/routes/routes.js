const { verificar_chamados } = require('../controllers/verificar_chamados');
const { criar_chamados, render_criar_chamados } = require('../controllers/criar_chamados');

module.exports = {
  verificar_chamados: (app) => {
    app.get('/', function (req, res) {
      verificar_chamados(app, req, res);
    });
  },
  criar_chamados: (app) => {
    app.post('/criar_chamado', function (req, res) {
      criar_chamados(app, req, res);
    });
  },
  render_criar_chamados: (app) => {
    app.get('/criar_chamados', function (req, res) {
      render_criar_chamados(app, req, res);
    });
  }
}
