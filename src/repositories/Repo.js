const mysql = require("mysql");
//const port = "0.0.0.0" || "192.168.1.103" || "192.168.2.193";
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

const consult = (sql, values="",msgReject) => {
  return new Promise((resolve,reject)=>{
    conn.getConnection((err,connect)=>{
      if (err) return reject(msgReject);
      connect.query(sql,values,(erro,result)=>{
        if (erro) return reject(msgReject);
        let row = JSON.parse(JSON.stringify(result));
        return resolve(row);
      });
    }); //endQuery
  });//endPromise
}
module.exports = consult;