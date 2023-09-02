const express = require ("express");
const router = express.Router();
const Controller = require("../src/controller/Controller.js");

router.get("/cart",Controller.carrinho);
router.post("/cart",Controller.carrinho);
router.get("/entrega",Controller.entrega);
router.post("/send",Controller.send);
router.get("/login",Controller.loginPage);
router.get("/logout",Controller.logout);
router.post("/loginCli",Controller.loginCli);
router.get("/cadCli",Controller.cadCli);
router.post("/cadClient",Controller.cadClient);

module.exports = router;