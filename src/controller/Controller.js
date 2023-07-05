const md5 = require ("md5");
const Repositories = require ("../repositories/Repositories");
const Cart = require("../repositories/Cart");

class Controller {
  async clientStart (req,res) {
    let {nome,qt,valor,unit,pao} = req.body;
    if (nome != undefined && qt != undefined && valor != undefined && pao != undefined) {
      Cart.addCart(nome,valor,qt,unit,pao);
      req.session.carte = Cart.getCart();
    }
    let Valid = false;
    let user = req.session.loginCli;
    user ? Valid=true:Valid=false;
    let row = await Repositories.allSnacks();
    res.render("inicio",{data:row,Valid});
  }
  
  carrinho (req,res) {
    let {name,op,unit,pao} = req.body;
    if (name != undefined && op != undefined && op=="up" && unit != undefined && pao != undefined) {
      Cart.addQtd(name,op,unit,pao);
      req.session.carte = Cart.getCart();
    }
    if (name != undefined && op != undefined && op=="down" && unit != undefined && pao != undefined) {
      Cart.rmQtd(name,op,unit,pao);
      req.session.carte = Cart.getCart();
    }
    let car = req.session.carte;
    let Valid = false;
    let user = req.session.loginCli;
    user ? Valid=true:Valid=false;
    res.render("cart",{cart:car,Valid});
  }
  
  entrega (req,res) {
    let user = req.session.loginCli;
    let verify;
    let cart = req.session.carte;
    (user?verify=true:verify=false);
    res.render("entrega",{user,verify,cart});
  }
  
  send (req,res) {
    let {nome,endereco,bairro,cidade,pag} = req.body;
    console.log(`${nome},${endereco},${bairro},${cidade},${pag}`);
  }
  
  loginPage (req,res) {
    let user = req.session.loginCli;
    let Valid = false;
    user ? Valid=true:Valid=false;
    res.render("login",{user,Valid});
  }
  
  logout (req,res) {
    req.session.destroy();
    res.render("login");
  }
  
  async loginCli (req,res) {
    let email = req.body.email;
    let pass = md5(req.body.passwd);
    let row = await Repositories.loginClient(email,pass);
    let erros = [];
    if (row.length == 0) {
      erros.push({text:"Usuário e/ou senha incorretos"});
    }
    if (erros.length > 0) {
      res.render("login",{erro:erros});
    } else {
      req.session.loginCli = row;
      let user = req.session.loginCli;
      let Valid = false;
      user ? Valid=true:Valid=false;
      res.render("login",{user,Valid});
    }
  }
  
  cadCli (req,res) {
    res.render("cadCli");
  }
  
  async cadClient (req,res) {
    
    let {nome,email,telefone,endereco,bairro,cidade} = req.body;
    let senha = md5(req.body.senha);
    let row = await Repositories.cadClient(nome,email,senha,telefone,endereco,bairro,cidade)
    .catch((err)=>{
      let not = [{text:err}];
      res.render("cadCli",{erro:not});
    });
    res.render("login",{user:row});
  }
  
  async loginAdmin (req,res) {
    let login = req.body.emailAd;
    let senha = md5(req.body.passwdAd);
    let row = await Repositories.allSnacks();
    let usr = await Repositories.loginAdmin(login,senha);
    let erros = [];
    if (usr.length == 0) { 
      erros.push({text:"Usuário e/ou senha incorretos"});
      res.render("login",{erro:erros});
    } else {
      req.session.loginAd = usr[0].nome;
      res.render("adminIndex",{user:usr[0].nome,data:row});
    }
  }
  
   async adminIndex (req,res) {
     if (req.session.loginAd) {
       let row = await Repositories.allSnacks();
       let row150 = await Repositories.allSnaks150()
       let row120 = await Repositories.allSnaks120()
      res.render("adminIndex",{data:row,data150:row150,data120:row120});
     } else {
       let not = [{error:"Você precisa estar logado para entrar!"}];
       let row = await Repositories.allSnacks();
       let Valid = false;
       let user = req.session.loginAd;
       user ? Valid=true:Valid=false;
       res.render("inicio",{data:row,erro:not[0].error,Valid});
     }
  }
  
  async editSnack (req,res) {
    let {id,nome,valor,descricao} = req.body;
    let row = await Repositories.allSnacks();
    let rowEdit = await Repositories.editSnack(id,nome,valor,descricao)
    .catch((err)=>{
      let not = [{error:err}];
      let usr = req.session.loginAd;
      res.render("adminIndex",{data:row,user:usr,erro:not[0].error});
    });
    let usr = req.session.loginAd;
    res.render("adminIndex",{data:row,user:usr});
  }
  
  async addSnack (req,res) {
    let path = req.file.filename;
    let {nome,valor,descricao,tipo} = req.body;
    let usr = req.session.loginAd;
    let rowAdd = await Repositories.addSnack (nome,valor,descricao,path,tipo);
    let row = await Repositories.allSnacks();
    let row150 = await Repositories.allSnaks150()
    let row120 = await Repositories.allSnaks120()
    res.render("adminIndex",{data:row,user:usr});
  }
  
  async delSnack (req,res) {
    let id = req.body.id;
    let rowDel = await Repositories.delSnack(id);
    let row = await Repositories.allSnacks();
    let usr = req.session.loginAd;
    res.render("adminIndex",{data:row,user:usr});
  }
}
module.exports = new Controller();