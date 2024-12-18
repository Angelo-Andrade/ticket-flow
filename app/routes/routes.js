const Joi = require('joi');
const { excluir_chamado, verificar_chamados_todos, verificar_chamados_filtrados, criar_chamado, render_criar_chamados } = require('../controllers/chamados');
const { render_conectar, autenticar, desconectar, render_criar_usuarios, cadastrarUsuario, render_erro_criar_usuarios, listar_usuarios } = require('../controllers/usuarios');

const schemaUsuario = Joi.object({
  nome_completo: Joi.string()
    .max(100)
    .required()
    .messages({
      'string.empty': 'O nome é obrigatório.',
      'string.max': 'O nome não pode exceder 100 caracteres.'
  }),

  nome_guerra: Joi.string()
    .max(100)
    .required()
    .messages({
      'string.empty': "Nome de guerra é obrigatório",
      'string.max': 'O nome de Guerra é grande demais, deve conter no máximo 100 caracteres'
  }),

  telefone: Joi.string()
  .pattern(/^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/)
  .required()
  .messages({
      'string.empty': 'O Telefone é obrigatório.', 
      'string.pattern.base': 'Telefone inválido.'
  }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'O Email é obrigatório.',
      'string.email.base': 'Email inválido.'
    }),

  senha: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/) // A senha deve ter pelo menos uma letra minúscula, uma maiúscula, um número e um caractere especial
    .min(8)
    .required()
    .messages({
      'string.empty': 'A senha é obrigatória.',
      'string.min': 'A senha deve ter pelo menos 8 caracteres.',
      'string.pattern.base': 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.'
    }),

  tipo: Joi.string()
    .valid('admin')
    .valid('comum')
    .required()
    .messages({
      'string.empty': 'O tipo de usuário é obrigatório.',
      'any.only': 'Tipo de usuário inválido.',
    }),

  id_posto_grad: Joi.string()
    .required()
    .messages({
      'string.empty': 'O posto de graduação é obrigatório.',
    }),
});

const schemaChamado = Joi.object({
  descricao: Joi.string()
    .min(10) 
    .max(500)
    .required()
    .messages({
        'string.empty': 'A descrição é obrigatória.',
        'string.min': 'A descrição deve ter pelo menos 10 caracteres.',
        'string.max': 'A descrição não pode exceder 500 caracteres.'
    }),

  urgencia: Joi.string()
    .valid('baixa', 'media', 'alta') // Somente valores válidos de acordo com o ENUM do banco
    .required()
    .messages({
        'any.only': 'Urgência deve ser "baixa", "media" ou "alta".',
        'string.empty': 'A urgência é obrigatória.'
    }),

  id_categoria_chamado: Joi.number()
    .max(25)
    .required()
    .messages({
        'number.empty': 'A categoria é obrigatória.'
    })
});

const validarDadosChamado = (req, res, next) => {
  const { error } = schemaChamado.validate(req.body);
  if (error) return res.status(400).render('criar_chamados.ejs');
  next();
};

const validarDadosUsuario = (req, res) => {
  const { error } = schemaUsuario.validate(req.body);
  console.log(error);
  return error;
};

module.exports = {
  verificar_chamados_todos: (app) => {
    app.get('/', function (req, res) {
      if(req.session.user) return verificar_chamados_todos(app, req, res);
      res.redirect('/usuario/conectar');
    });
  },

  verificar_chamados_filtrados: (app) => {
    app.get('/filtrar', function (req, res) {
      if(req.session.user) return verificar_chamados_filtrados(app, req, res);
      res.redirect('/usuario/conectar');
    });
  },
  
  criar_chamado: (app) => {
    app.post('/criar_chamado', function (req, res) {
      if(req.session.user) return criar_chamado(app, req, res);
      res.redirect('/usuario/conectar');
    });
  },

  excluir_chamado: (app) => {
    app.post('/chamado/excluir', function (req, res) {
      if(req.session.user) return excluir_chamado(app, req, res);
      res.redirect('/usuario/conectar');
    });
  },
  
  render_criar_chamados: (app) => {
    app.get('/criar_chamados', function (req, res) {
      if(req.session.user) return render_criar_chamados(app, req, res);
       res.redirect('/usuario/conectar');
    });
  },

  render_conectar: (app) => {
    app.get('/usuario/conectar', function (req, res) {
      if(req.session.user) return res.redirect('/');
      render_conectar(app, req, res);
    });
  },

  autenticar_usuario: (app) => {
    app.post('/usuario/autenticar', function (req, res) {
      if(req.session.user) return res.redirect('/'); 
      autenticar(app, req, res);
    });
  },

  desconectar_usuario: (app) => {
    app.get('/usuario/desconectar', function (req, res) {
      desconectar(app, req, res);
    });
  },

  render_criar_usuarios: (app) => {
    app.get('/usuario/criar', function (req, res) {
      if(req.session.user) return render_criar_usuarios(app, req, res);
      res.redirect('/usuario/conectar');
    });
  },

  cadastrar_usuarios: (app) => {
    app.post('/usuario/cadastrar', function (req, res) {
      const invalidInput = validarDadosUsuario(req, res);
      if(!req.session.user) return res.redirect("/usuario/conectar");
      if(invalidInput) return render_erro_criar_usuarios(app, req, res, invalidInput);
      cadastrarUsuario(app, req, res);
    });
  },

  listar_usuarios: (app) => {
    app.get('/usuario/listar', function(req, res){
      if(req.session.user) return listar_usuarios(app, req, res);
      res.redirect("/usuario/conectar");
    });
  },

  render_not_found: (app) => {
    app.get('*', function (req, res) {
      res.render('notfound.ejs', {errorMessage: 'Um erro inesperado aconteceu.\nPor favor volte mais tarde'});
    });
  }

}
