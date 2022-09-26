const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth");
const {
  getBlogs,
  addBlog,
  getBlog,
  deleteBlog,
  editBlog,
} = require("../controllers/blog");

router.get("/getBlogs", getBlogs);
router.get("/getBlog/:id", getBlog);
router.post("/addBlog", authMiddleware, addBlog);
router.delete("/deleteBlog/:id", authMiddleware, deleteBlog);
router.put("/editBlog/:id", authMiddleware, editBlog);

module.exports = router;
