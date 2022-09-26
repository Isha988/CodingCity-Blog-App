const express = require("express");
const router = express.Router();
const { login } = require("../controllers/admin.js");

router.post("/login", login);

module.exports = router;
