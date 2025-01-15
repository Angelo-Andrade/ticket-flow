let express = require("express");
let app = express();

const dovenv = require('dotenv');
dovenv.config();

let expressSession = require('express-session');

const RedisStore = require('connect-redis').RedisStore;

const { createClient } = require('./cacheConnection');
const client = createClient();
client.connect().catch(console.error);

client.on('error', (err) => {
    console.error('Erro no Redis:', err);
});

let port = process.env.PORT || 3000;

app.set("views", "./app/views");
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));

app.use(expressSession({
    store: new RedisStore({ client }),
    secret: process.env.SECRET,
    name: 'uniqueSessionID',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
		//maxAge: 1000 * 60 * 5
    },
}));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado no servidor!'); 
});

// Middleware para passar o nome do usuário para todas as views
app.use((req, res, next) => {
    if (req.session && req.session.user) {
        res.locals.grad_post = req.session.user.grad_post || 'P/G';
        res.locals.war_name = req.session.user.war_name || 'Nome';
        res.locals.user_type = req.session.user.user_type || 'comum';
    } else {
        res.locals.war_name = 'Visitante';
    }
    next(); 
});


app.listen(port, function () {
	console.log("Servidor rodando com express na porta", port);
});

module.exports = app;
