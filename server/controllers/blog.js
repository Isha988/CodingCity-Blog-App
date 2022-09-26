const blog = require("../models/blog");
const Blog = require("../models/blog");
const blogBody = require("../models/blogBody");
const BlogBody = require("../models/blogBody");
const {scheduleCampaign} = require("../utils/sib.js")

const getBlogs = async (req, res) => {
  try {
    const { skip = 0, search, category } = req.query;
    let filter = {};
    let sort = {_id:-1}

    if (category) {
      filter = {category};
    }

    if (search) {
      filter = {$text : { $search: search },
      score : {$meta: "textScore"}}

      sort = { score: { $meta: "textScore" }}
    }

    const limit = 15;
    const totalCount = await Blog.find(filter).count();
    const blogs = await Blog.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    return res.status(200).json({ blogs, totalCount });
  } catch (error) {
    return res.status(500).json({ message: "some error occur" });
  }
};

const getBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id).populate("content");

    const prev = await Blog.find({_id: {$lt: id}}).sort({_id: -1 }).limit(1);
    const next = await Blog.find({_id: {$gt: id}}).sort({_id: 1 }).limit(1);

    res.status(200).json({blog, prev: prev[0], next: next[0]});
  } catch (error) {
    res.status(500).json({ message: "some error occur" });
  }
};

const addBlog = async (req, res) => {
  try {
    const blogBody = new BlogBody({
      content: JSON.stringify(req.body.content),
    });
    const newBlogBody = await blogBody.save();

    const blog = new Blog({ ...req.body, content: newBlogBody._id });
    const newBlog = await blog.save();

    await scheduleCampaign(newBlog);

    res.status(200).json(newBlog); 
  } catch (error) {
    res.status(500).json({ message: "some error occur" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);

    //if(!blog) return res.status(400).json({message: "Blog does not exist"});

    await blogBody.findOneAndDelete({ _id: blog.content });
    blog.remove();

    res.status(200).json({ _id: req.params.id, success: true });
  } catch (error) {
    res.status(500).json({ message: "some error occur" });
  }
};

const editBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.body._id);
    //if(!blog) return res.status(400).json({message: "Blog does not exist"});

    const blogBody = await BlogBody.findById(blog.content);
    blogBody.content = JSON.stringify(req.body.content);
    await blogBody.save();

    blog.overwrite({ ...req.body, content: blogBody._id });
    await blog.save();

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "some error occur" });
  }
};

module.exports = { addBlog, getBlog, getBlogs, deleteBlog, editBlog };
