const mysql = require("mysql");
const port = "0.0.0.0" || "192.168.1.103";
const conn = mysql.createConnection({
  "host":port,
  "port":"3306",
  "user":"root",
  "password":"root",
  "database":"lanchonete"
});

const consult = (sql, values="",msgReject) => {
  return new Promise((resolve,reject)=>{
    conn.query(sql,values,(erro,result)=>{
      if (erro) return reject(msgReject);
      let row = JSON.parse(JSON.stringify(result));
      return resolve (row);
    });//endQuery
  });//endPromise
}
module.exports = consult;