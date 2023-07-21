const express = require ("express");
const path = require ("path");
const multer = require ("multer");
const router = express.Router();
const Controller = require("../src/controller/Controller");

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
router.post("/loginAdmin",Controller.loginAdmin);
router.get("/adminIndex",Controller.adminIndex);
router.post("/create",upload.single("file"),Controller.addSnack);
router.post("/edit",Controller.editSnack);
router.post("/delete",Controller.delSnack);
router.post("/createCateg",Controller.createCateg)

module.exports = router;