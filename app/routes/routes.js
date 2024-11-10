const { home } = require('../controllers/home');

module.exports = {
  home: (app) => {
    app.get('/', function (req, res) {
      home(app, req, res);
    });
  }
}
