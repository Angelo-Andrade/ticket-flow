console.log('Index.js');
const app = require('./config/server');
const routes = require('./app/routes/routes');

routes.verificar_chamados(app);
