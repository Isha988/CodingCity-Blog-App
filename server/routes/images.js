const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth");
const { fetchAllImages, uploadImage } = require("../controllers/images");

router.get("/getAll", fetchAllImages);
router.post("/upload", authMiddleware, uploadImage);

module.exports = router;
