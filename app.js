const express = require("express");
const bodyParser = require("body-parser");
const exphb = require("express-handlebars");
const helmet = require("helmet");
const session = require ("express-session");
const port = process.env.PORT || 3001;
const admin = require ("./routes/admin")
const client = require ("./routes/client")
const Controller = require("./src/controller/Controller");
const app = express();

//config
  //session
app.use(session({
  secret: "Lanche#@.Brasa",
  resave: true,
  saveUninitialized: true
}));
  //css e js
app.use(express.static(__dirname+"/assets"));
  //body-parser
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
  //handlebars
app.engine("handlebars",exphb.engine({defaultLayout:"main"}));
app.set("view engine", "handlebars");
  //helmet
app.use(helmet());
//rotas
app.get("/",Controller.clientStart);
app.post("/",Controller.clientStart);
app.use("/admin",admin);
app.use("/client",client);


app.listen(port,()=>{
  console.log(`Servidor rodando em http://localhost:${port}`);
});