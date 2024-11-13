let express = require("express");
let app = express();

// A variável process.env.PORT é configurada pelo Replit para a porta correta
let port = process.env.PORT || 3000; // Caso não haja a variável, usa a 3000 como fallback

app.set("view engine", "ejs");
app.set("views", "./app/views");
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));

app.listen(port, function () {
	console.log("Servidor rodando com express na porta", port);
});

module.exports = app;
