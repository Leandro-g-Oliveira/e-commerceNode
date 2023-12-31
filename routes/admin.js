const express = require ("express");
const path = require ("path");
const multer = require ("multer");
const router = express.Router();
const AdminController = require("../src/controller/AdminController.js");

//multer
const storage = multer.diskStorage({
  destination: function (req,file,cb) {
    cb (null,"assets/img");
  },
  filename: function (req,file,cb) {
    let name = Math.random().toString(16).substr(2) + Math.random().toString(16).substr(2);
    const fileName = name + path.extname(file.originalname);
    cb (null, fileName);
  }
});
const upload = multer({storage:storage});


//rotas
router.post("/loginAdmin",AdminController.loginAdmin);
router.get("/adminInit",AdminController.adminInit);
router.get("/adminIndex",AdminController.adminIndex);
router.post("/create",upload.single("file"),AdminController.addSnack);
router.post("/edit",AdminController.editSnack);
router.post("/delete",AdminController.delSnack);
router.get("/adminManage",AdminController.adminManage);
router.post("/addAdmin",AdminController.addAdmin);
router.post("/editAdmin",AdminController.editAdmin);
router.get("/pedidos",AdminController.adminPedidos);
router.post("/deletePedido",AdminController.deletePedido)
module.exports = router;