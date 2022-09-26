const express = require("express");
const router = express.Router();
const {formValidationMiddleware} = require("../middleware/formValidation.js")
const { contact, comment, subscribe } = require("../controllers/controller.js");

router.post("/contact", formValidationMiddleware, contact);
router.post("/comment", formValidationMiddleware, comment);
router.post("/subscribe", subscribe);

module.exports = router;
