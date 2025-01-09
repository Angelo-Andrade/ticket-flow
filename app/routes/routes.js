const Joi = require('joi');
const { excluir_chamado, verificar_chamados_todos, verificar_chamados_filtrados, criar_chamado, render_criar_chamados, render_erro_criar_chamados, alterar_chamado } = require('../controllers/chamados');
const { render_conectar, autenticar, desconectar, render_criar_usuarios, cadastrarUsuario, render_erro_criar_usuarios, listar_usuarios, render_alterar_usuario, alterar_usuario, desativar_usuarios, editar_perfil, render_editar_perfil } = require('../controllers/usuarios');

const schemaCadastrarUsuario = Joi.object({
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
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/)
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

const schemaEditarUsuario = Joi.object({
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

  novasenha: Joi.string()
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/)
  .min(8)
  .allow('', null)
  .messages({
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

const validarDadosChamado = (req) => {
  const { error } = schemaChamado.validate(req.body);
  console.log(error);
  return error;
};

const validarDadosCadastrarUsuario = (req) => {
  const { error } = schemaCadastrarUsuario.validate(req.body);
  console.log(error);
  return error;
};

const validarDadosEditarUsuario = (req) => {
  const { error } = schemaEditarUsuario.validate(req.body);
  console.log(error);
  return error;
};

module.exports = {
  verificar_chamados_todos: (app) => {
    app.get('/', function (req, res) {
      if(req.session.user) return verificar_chamados_todos(app, req, res);
      res.redirect("/usuarios/conectar?error=auth_required");
    });
  },

  verificar_chamados_filtrados: (app) => {
    app.get('/filtrar', function (req, res) {
      if(req.session.user) return verificar_chamados_filtrados(app, req, res);
      res.redirect("/usuarios/conectar?error=auth_required");
    });
  },
  
  criar_chamado: (app) => {
    app.post('/criar_chamado', function (req, res) {
      const invalidInput = validarDadosChamado(req);
      if(!req.session.user) return  res.redirect("/usuarios/conectar?error=auth_required");
      if(invalidInput) return render_erro_criar_chamados(app, req, res);
      criar_chamado(app, req, res);
    });
  },

  excluir_chamado: (app) => {
    app.post('/chamado/excluir', function (req, res) {
      if(req.session.user) return excluir_chamado(app, req, res);
      res.redirect("/usuarios/conectar?error=auth_required");
    });
  },

  alterar_chamado: (app) => {
    app.post('/chamado/alterar', function (req, res) {
      if(req.session.user) return alterar_chamado(app, req, res);
      res.redirect('/usuario/conectar');
    });
  },
  
  render_criar_chamados: (app) => {
    app.get('/criar_chamados', function (req, res) {
      if(req.session.user) return render_criar_chamados(app, req, res);
      res.redirect("/usuarios/conectar?error=auth_required");
    });
  },

  render_conectar: (app) => {
    app.get('/usuarios/conectar', function (req, res) {
      if(req.session.user) return res.redirect('/');
      render_conectar(app, req, res);
    });
  },

  autenticar_usuario: (app) => {
    app.post('/usuarios/autenticar', function (req, res) {
      if(req.session.user) return res.redirect('/'); 
      autenticar(app, req, res);
    });
  },

  desconectar_usuario: (app) => {
    app.get('/usuarios/desconectar', function (req, res) {
      desconectar(app, req, res);
    });
  },

  render_criar_usuarios: (app) => {
    app.get('/usuarios/criar', function (req, res) {
      if(req.session.user && req.session.user.user_type === 'admin') return render_criar_usuarios(app, req, res);
      res.redirect("/usuarios/conectar?error=auth_required");
    });
  },

  cadastrar_usuarios: (app) => {
    app.post('/usuarios/cadastrar', function (req, res) {
      const invalidInput = validarDadosCadastrarUsuario(req, res);
      if(!req.session.user || !req.session.user.user_type === 'admin') return res.redirect("/usuarios/conectar?error=auth_required");
      if(invalidInput) return render_erro_criar_usuarios(app, req, res, invalidInput);
      cadastrarUsuario(app, req, res);
    });
  },
  
  listar_usuarios: (app) => {
    app.get('/usuarios', function(req, res){
      console.log('Rota de listar usuários');
      if(req.session.user && req.session.user.user_type === 'admin') return listar_usuarios(app, req, res);
      res.redirect("/usuarios/conectar");
    });
  },
  
  render_editar_usuarios: (app) => {
    app.get('/usuarios/editar', function(req, res){
      if(req.session.user && req.session.user.user_type === 'admin') return render_alterar_usuario(app, req, res, [null, null]);
      res.redirect("/usuarios/conectar");
    });
  },
  
  editar_usuarios: (app) => {
    app.post('/usuarios/editar', function(req, res){
      const invalidInput = [ req.query, validarDadosEditarUsuario(req, res)];
      console.log('[ROUTES cadastrar usuario] invalidInput: ', invalidInput);
      if(!req.session.user || !req.session.user.user_type === 'admin') return res.redirect("/usuarios/conectar");
      if(invalidInput[1]) return render_alterar_usuario(app, req, res, invalidInput);
      alterar_usuario(app, req, res);
    });
  },
  
  desativar_usuarios: (app) => {
    app.post('/usuarios/desativar', function(req, res){
      console.log('sim');
      if(req.session.user && req.session.user.user_type === 'admin') return desativar_usuarios(app, req, res);
      res.redirect("/usuarios/conectar");
    });
  },

  render_editar_perfil: (app) => {
    app.get('/editar_perfil', function(req, res){
      console.log('Rota de editar perfil');
      if(req.session.user) return render_editar_perfil(app, req, res, [null, null]);
      res.redirect("/usuarios/conectar");
    });
    
  },

  editar_perfil: (app) => {
    app.post('/editar_perfil', function(req, res){
      const invalidInput = [ req.query, validarDadosEditarUsuario(req, res)];
      console.log('[ROUTES editar perfil] invalidInput: ', invalidInput);
      if(!req.session.user) return res.redirect("/usuarios/conectar");
      if(invalidInput[1]) return render_editar_perfil(app, req, res, invalidInput);
      editar_perfil(app, req, res);
    });
  },

  render_not_found: (app) => {
    app.get('*', function (req, res) {
      res.render('notfound.ejs', {errorMessage: 'Um erro inesperado aconteceu.\nPor favor volte mais tarde'});
    });
  }

}
