const express = require('express');

const router = express.Router();

const blogController = require('../controller/blogController.js');

router.post("/create",blogController.createBlog);

router.get("/getAll",blogController.getAllBlogs);

router.delete("/delete/:blogId",blogController.deleteBlog);


module.exports = router;