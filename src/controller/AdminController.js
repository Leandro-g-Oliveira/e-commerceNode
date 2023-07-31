const md5 = require ("md5");
const Repositories = require ("../repositories/Repositories");

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
      let row = await Repositories.allSnacksLanches();
      let row150 = await Repositories.allSnaks150();
      let row120 = await Repositories.allSnaks120();
      let rowAll = await Repositories.allSnacks();
      let categ = await Repositories.allCategory();
     if (req.session.loginAd) {
      res.render("adminIndex",{data:row,row150,row120,categ,rowAll});
     } else {
       let erro = {text:"Você precisa estar logado para entrar!"};
       let Valid = false;
       let user = req.session.loginAd;
       user ? Valid=true:Valid=false;
       res.render("login",{erro,Valid});
     }
  }
  
  async editSnack (req,res) {
    let {id,nome,valor,descricao} = req.body;
    let rowEdit = await Repositories.editSnack(id,nome,valor,descricao)
    .catch((err)=>{
      let erro = {text:"Erro ao editar lanche! Verifique os dados inseridos!"};
      let usr = req.session.loginAd;
      res.render("adminInit",{erro,user:usr});
      return;
    });
    let usr = req.session.loginAd;
    let row = await Repositories.allSnacksLanches();
    let rowAll = await Repositories.allSnacks();
    let row150 = await Repositories.allSnaks150();
     let row120 = await Repositories.allSnaks120();
     let categ = await Repositories.allCategory();
    res.render("adminIndex",{data:row,user:usr,row150,row120,rowAll,categ});
  }
  
  async addSnack (req,res) {
    let path = req.file.filename;
    let {nome,valor,descricao,tipo} = req.body;
    let rowAdd = await Repositories.addSnack (nome,valor,descricao,path,tipo)
    let user = req.session.loginCli;
    .catch((err)=>{
      let erro = {text:err};
      res.render("adminInit",{erro,user:req.session.loginAd});
    })
    let row = await Repositories.allSnacksLanches();
    let row150 = await Repositories.allSnaks150();
    let row120 = await Repositories.allSnaks120();
    let rowAll = await Repositories.allSnacks();
    let categ = await Repositories.allCategory();
    res.render("adminIndex",{data:row,row150,row120,rowAll,categ,user:req.session.loginAd});
  }
  
  async delSnack (req,res) {
    let id = req.body.id;
    let rowDel = await Repositories.delSnack(id);
    let row = await Repositories.allSnacksLanches();
    let row150 = await Repositories.allSnaks150();
    let row120 = await Repositories.allSnaks120();
    let rowAll = await Repositories.allSnacks();
    let categ = await Repositories.allCategory();
    let usr = req.session.loginAd;
    res.render("adminIndex",{data:row,user:usr,row150,rowAll,row120,categ});
  }
  async createCateg (req,res) {
    let nome =  req.body.nomeCateg;
    let rowAdd = await Repositories.setCategory(nome);
    .catch((err)=>{
      let erro = {text:err};
      res.render("adminInit",{erro,user:req.session.loginAd});
    })
    let row = await Repositories.allSnacksLanches();
    let row150 = await Repositories.allSnaks150();
    let row120 = await Repositories.allSnaks120();
    let rowAll = await Repositories.allSnacks();
    let categ = await Repositories.allCategory();
    let usr = req.session.loginAd;
    res.render("adminIndex",{data:row,user:usr,categ,row150,rowAll,row120});
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
    let {nome, email, id} = req.body;
    let passwd = md5(req.body.passwd);
    let adminEdit = await Repositories.editAdmin(id, nome, email, passwd)
    .catch((err)=>{
      let erro = {text:err};
      res.render("adminInit",{erro,user:req.session.loginAd});
    })
    let users = await Repositories.allAdmins();
    res.render("adminManage",{users});
  }
  async addAdmin (req,res) {
    let {nome,email} = req.body;
    let senha = md5(req.body.passwd);
    let newUser = await Repositories.addAdmin(nome,email,senha)
    .catch((err)=>{
      let erro = {text:err};
      res.render("adminInit",{erro,user:req.session.loginAd});
    })
    let users = await Repositories.allAdmins();
    res.render("adminManage",{users});
  }
}
module.exports = new AdminController();