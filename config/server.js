let express = require("express");
let app = express();

const dovenv = require('dotenv');
dovenv.config();

let expressSession = require('express-session');

const RedisStore = require('connect-redis').RedisStore;

const { createClient } = require('./cacheConnection');
const client = createClient();
client.connect().catch(console.error);


let port = 3000;

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
		maxAge: 1000 * 60 * 5
    },
}));

app.listen(port, function () {
	console.log("Servidor rodando com express na porta", port);
});

module.exports = app;
