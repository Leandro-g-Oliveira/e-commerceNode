const mysql = require("mysql");
const repo = require("./Repo.js");
const port = "0.0.0.0" || "192.168.1.103" || "192.168.2.193";
const conn = mysql.createPool({
  "host":"db4free.net",
  "port":"3306",
  "user":"leandrooliveira",
  "password":"BolachaDeAbacaxi",
  "database":"lanchonetebrasa"
});

/*const conn = mysql.createPool({
  "host":port,
  "port":"3306",
  "user":"root",
  "password":"root",
  "database":"lanchonete"
});*/

class Repositories {
  allSnacks () {
    let sql = "SELECT * FROM lanches";
    return repo (sql,"Falha ao conectar!");
  }
  allSnacksHamb () {
    let sql = "SELECT * FROM lanches WHERE categoria = 4";
    return repo (sql,"Falha ao conectar!");
  }
  allSnacksCarne () {
    let sql = "SELECT * FROM lanches WHERE categoria = 5";
    return repo (sql,"Falha ao conectar!");
  }
  allRefri () {
    let sql = "SELECT * FROM lanches WHERE categoria = 6";
    return repo (sql,"Falha ao conectar!");
  }
  getCateg () {
    let sql = "SELECT * FROM categoria";
    return repo (sql,"Falha na conexão");
  }
  loginClient (login, passwd) {
    let sql = `SELECT * FROM usuarios WHERE email = ? AND senha = ?`;
    return repo (sql,[login,passwd],"Usuário e/ou senha incorretos!");
  }
  
  loginAdmin(login,senha) {
    let sql = "SELECT * FROM admin WHERE email = ? AND senha = ?";
    return repo (sql,[login,senha],"Usuário e/ou senha incorretos!");
  }
  

  cadClient (name,email,passwd,tel,address,bairro,city) {
    return new Promise((resolve, reject)=>{
      conn.query("SELECT email FROM usuarios WHERE email = ?",[email],(erro,result)=>{
        if (erro) return reject(erro);
        if (result.length == 0) {
          conn.query("INSERT INTO usuarios (nome, email, senha, telefone, endereco, bairro, cidade) VALUES (?,?,?,?,?,?,?)",[name, email, passwd, tel, address, bairro, city
            ],(erro,result)=>{
              if (erro) return reject(erro);
              let row = JSON.parse(JSON.stringify(result));
              return resolve(row);
            });
        } else {
          return reject ("Email já cadastrado!");
        }//endif
      });//endquery
    });//promise
  }//cadClient
  
  editSnack (id,nome,valor,descricao) {
    let sql = "UPDATE lanches SET nome = ?, valor = ?, descricao = ? WHERE id = ?";
    return repo (sql,[nome,valor,descricao,id],"Falha ao tentar editar");
  }
  
  delSnack (id) {
    let sql = "DELETE FROM lanches WHERE id = ?";
    return repo (sql,id,"Não foi possível remover!");
  }
  
  addSnack (nome,valor,descricao,tipo,path) {
    let sql = `INSERT INTO lanches (nome,valor,descricao,categoria,path) VALUES (?,?,?,?,?)`;
    return repo (sql,[nome,valor,descricao,tipo,path],"Não foi possível cadastrar o lanche! ");
  }
  allAdmins () {
    let sql = "SELECT * FROM admin";
    return repo (sql,"Erro ao receber dados");
  }
  editAdmin (id, nome, email, senha) {
    let sql = "UPDATE admin SET nome = ?, email = ?, senha = ? WHERE id = ?";
    return repo (sql,[nome,email,senha,id],"Falha ao tentar editar admin");
  }
  addAdmin (nome,email,senha) {
    let sql = "INSERT INTO admin(nome,email,senha) VALUES (?,?,?)";
    return repo (sql,[nome,email,senha],"Falha ao cadastrar admin!");
  }
  enviarPedido (pedido,valor,pagamento,tipo,nome,endereco,bairro,cidade) {
    let sql = "INSERT INTO pedidos (pedido,valor,pagamento,tipo,nome,endereco,bairro,cidade) VALUES(?,?,?,?,?,?,?,?)";
    return repo (sql,[pedido,valor,pagamento,tipo,nome,endereco,bairro,cidade],"Falha ao finalizar pedido!");
  }
  getPedidos () {
    let sql = "SELECT * FROM pedidos";
    return repo (sql,"Falha ao conectar!");
  }
  delPedido (id) {
    let sql = "DELETE FROM pedidos WHERE id = ?";
    return repo (sql,[id],"Não foi possível deletar o pedido!");
  }
}//fim da classe


module.exports = new Repositories();