const { Blog } = require('../model/blog');
const isEmpty = require('../lib/checkLib');
const { generateResponse } = require('../lib/responseLib');

async function createBlog(req,res){

    let stags;

    if(isEmpty(req.body.tags)){
        console.log("empty");
        console.log(req.body.tags); 
         stags = [];
    }else{
        console.log("not empty");
         stags = req.body.tags.split(",");
    }

    const blog = new Blog({
        blogId : req.body.blogId,
        userId : req.body.userId,
        author : req.body.author,
        title : req.body.title,
        topic : req.body.topic,
        content : req.body.content,
        tags : stags,
        createdOn : req.body.createdOn
    });

    await blog.save();

    const nblog = blog.toObject();

    nblog.re

    return res.send(generateResponse(200,null,"Blog Created Successfully",nblog));

}

async function getAllBlogs(req,res){

    const blogs = await Blog.find().select('-_id-__v');

    if(isEmpty(blogs)){
        return res.send(generateResponse(404,true,"No blogs Posted Yet",null));
    }
    else{
        return res.send(generateResponse(200,null,"Blogs Found",blogs));
    }

}

async function deleteBlog(req,res){
    const blog = await Blog.findOneAndRemove({blogId : req.params.blogId});

    if(!blog) return res.send(generateResponse(503,true,"Unable to Delete the Blog",null));

    return res.send(generateResponse(200,null,"Deleted Successfully",blog));
}

module.exports.getAllBlogs = getAllBlogs;

module.exports.createBlog = createBlog;

module.exports.deleteBlog = deleteBlog;