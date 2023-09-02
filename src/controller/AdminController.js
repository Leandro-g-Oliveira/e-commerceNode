const md5 = require ("md5");
const Repositories = require ("../repositories/Repositories.js");

class AdminController {
  async loginAdmin (req,res) {
    let login = req.body.emailAd;
    let senha = md5(req.body.passwdAd);
    let usr = await Repositories.loginAdmin(login,senha)
    if (usr.length == 0) {
      let erro = {text:"Usuário e/ou senha incorretos"};
      res.render("login",{erro});
    } else {
      req.session.loginAd = usr[0].nome;
      res.render("adminInit",{user:req.session.loginAd});
    }
  }
  
  adminInit (req, res) {
    if (req.session.loginAd) {
      let user = req.session.loginAd;
      res.render("adminInit",{user});
    } else {
      let erro = {text:"Você precisa estar logado para entrar!"}
      res.render("login",{erro});
    }
  }
  async adminIndex (req,res) {
    if (req.session.loginAd) {
      let rowAll = await Repositories.allSnacks();
      let rowHamb = await Repositories.allSnacksHamb();
      let rowCarne = await Repositories.allSnacksCarne();
      let rowRefri = await Repositories.allRefri();
      let categ = await Repositories.getCateg();
      res.render("adminIndex",{data:rowAll,rowHamb,rowCarne,rowRefri,categ,user:req.session.loginAd});
    } else {
      let erro = {text:"Você precisa estar logado para entrar!"};
      let Valid = false;
      let user = req.session.loginAd;
      user ? Valid=true:Valid=false;
      res.render("login",{erro,Valid});
    }
  }
  
  async adminPedidos (req,res) {
    if (req.session.loginAd) {
      let pedidos = await Repositories.getPedidos();
      res.render("pedidos",{pedidos})
    } else {
      let erro = {text:"Você precisa estar logado para entrar!"}
      res.render("login",{erro});
    }
  }
  
  async deletePedido (req,res) {
    if (req.session.loginAd) {
      let id = req.body.id;
      let delPedido = await Repositories.delPedido(id)
      .catch((err)=>{
        let erro = {text:err};
        res.render("adminInit",{erro,user:req.session.loginAd});
      })
      let pedidos = await Repositories.getPedidos();
      res.render("pedidos",{pedidos})
    } else {
      let erro = {text:"Você precisa estar logado para entrar!"}
      res.render("login",{erro});
    }
    
  }
  
  async editSnack (req,res) {
    if (req.session.loginAd) {
      let {id,nome,valor,descricao} = req.body;
      let rowEdit = await Repositories.editSnack(id,nome,valor,descricao)
      .catch((err)=>{
        let erro = {text:"Erro ao editar lanche! Verifique os dados inseridos!"};
        let usr = req.session.loginAd;
        res.render("adminInit",{erro,user:usr});
        return;
      });
      let usr = req.session.loginAd;
      let rowAll = await Repositories.allSnacks();
      let rowHamb = await Repositories.allSnacksHamb();
      let rowCarne = await Repositories.allSnacksCarne();
      let rowRefri = await Repositories.allRefri();
      let categ = await Repositories.getCateg();
      res.render("adminIndex",{data:rowAll,rowHamb,rowCarne,rowRefri,categ,user:usr});
    } else {
      let erro = {text:"Você precisa estar logado para entrar!"}
      res.render("login",{erro});
    }
  }
  
  async addSnack (req,res) {
    if (req.session.loginAd) {
      let path = req.file.filename;
      let {nome,valor,descricao,tipo} = req.body;
      let user = req.session.loginAd;
      let rowAdd = await Repositories.addSnack (nome,valor,descricao,tipo,path)
      .catch((err)=>{
        let erro = {text:err};
        res.render("adminInit",{erro,user:req.session.loginAd});
      })
      let rowAll = await Repositories.allSnacks();
      let rowHamb = await Repositories.allSnacksHamb();
      let rowCarne = await Repositories.allSnacksCarne();
      let rowRefri = await Repositories.allRefri();
      let categ = await Repositories.getCateg();
      res.render("adminIndex",{data:rowAll,rowHamb,rowCarne,rowRefri,categ,user:req.session.loginAd});
    } else {
      let erro = {text:"Você precisa estar logado para entrar!"}
      res.render("login",{erro});
    }
    
  }
  
  async delSnack (req,res) {
    if (req.session.loginAd) {
      let id = req.body.id;
      let rowDel = await Repositories.delSnack(id);
      let rowAll = await Repositories.allSnacks();
      let rowHamb = await Repositories.allSnacksHamb();
      let rowCarne = await Repositories.allSnacksCarne();
      let rowRefri = await Repositories.allRefri();
      let categ = await Repositories.getCateg();
      let usr = req.session.loginAd;
      res.render("adminIndex",{data:rowAll,rowHamb,rowCarne,rowRefri,categ,user:usr});
    } else {
      let erro = {text:"Você precisa estar conectado para entrar!"};
      res.render("login",{erro});
    }
  }
  
  async adminManage (req,res) {
    if(req.session.loginAd) {
      let users = await Repositories.allAdmins();
      res.render("adminManage",{users});
    } else {
      let erro = {text:"Você precisa estar conectado para entrar!"};
      res.render("login",{erro});
    }
  }
  
  async editAdmin (req,res) {
    if (req.session.loginAd) {
      let {nome, email, id} = req.body;
      let senha = md5(req.body.senha);
      let adminEdit = await Repositories.editAdmin(id, nome, email, senha)
      .catch((err)=>{
        let erro = {text:err};
        res.render("adminInit",{erro,user:req.session.loginAd});
      })
      let users = await Repositories.allAdmins();
      res.render("adminManage",{users});
    } else {
      let erro = {text:"Você precisa estar conectado para entrar!"};
      res.render("login",{erro});
    }
    
  }
  
  async addAdmin (req,res) {
    if (req.session.loginAd) {
      let {nome,email} = req.body;
      let senha = md5(req.body.senha);
      let newUser = await Repositories.addAdmin(nome,email,senha)
      .catch((err)=>{
        let erro = {text:err};
        res.render("adminInit",{erro,user:req.session.loginAd});
      })
      let users = await Repositories.allAdmins();
      res.render("adminManage",{users});
    } else {
      let erro = {text:"Você precisa estar conectado para entrar!"};
      res.render("login",{erro});
    }
    
  }
}
module.exports = new AdminController();