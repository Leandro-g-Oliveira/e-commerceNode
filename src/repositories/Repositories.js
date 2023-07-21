const mysql = require("mysql");
const repo = require("./repo");
const port = "0.0.0.0" || "192.168.1.103";
const conn = mysql.createConnection({
  "host":port,
  "port":"3306",
  "user":"root",
  "password":"root",
  "database":"lanchonete"
});

class Repositories {
  allSnacks () {
    let sql = "SELECT * FROM lanches";
    return repo (sql,"Falha ao conectar!");
  }
  
  allSnacksLanches () {
    let sql = "SELECT * FROM lanches WHERE categoria = 1";
    return repo(sql,"Falha ao conectar!");
  }
  allSnaks150 () {
    let sql = "SELECT * FROM lanches WHERE categoria = 2";
    return repo(sql,"Falha ao conectar!");
  }
  allSnaks120 () {
    let sql = "SELECT * FROM lanches WHERE categoria = 3";
    return repo(sql,"Falha ao conectar!");
  }
  allCategory () {
    let sql = "SELECT * FROM categoria";
    return repo(sql,"falha ao buscar categoria");
  }
  setCategory (nome) {
    let sql = "INSERT INTO categoria (nome) VALUES (?)";
    return repo(sql,[nome],"Não foi possível castrar esta categoria!");
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
  
  addSnack (nome,valor,descricao,path,tipo) {
    let sql = `INSERT INTO lanches (nome,valor,descricao,categoria,path) VALUES (?,?,?,?,?)`;
    return repo (sql,[nome,valor,descricao,tipo,path],"Não foi possível cadastrar o lanche! ");
  }
  
}//fim da classe


module.exports = new Repositories();