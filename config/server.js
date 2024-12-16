let express = require("express");
let app = express();

const dovenv = require('dotenv');
dovenv.config();

let expressSession = require('express-session');

let port = 3000;

app.set("views", "./app/views");
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({
	secret: process.env.SECRET,
	name: 'uniqueSessionID',
	resave: false,
	saveUninitialized: false
}));

app.listen(port, function () {
	console.log("Servidor rodando com express na porta", port);
});

module.exports = app;
