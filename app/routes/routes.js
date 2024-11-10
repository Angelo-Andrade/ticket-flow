const { verificar_chamados } = require('../controllers/verificar_chamados');

module.exports = {
  verificar_chamados: (app) => {
    app.get('/', function (req, res) {
      verificar_chamados(app, req, res);
    });
  }
}
