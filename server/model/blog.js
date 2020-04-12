const mongoose = require('mongoose');


const blogSchema = mongoose.Schema({
    blogId :{
        type : String,
        required : true
    },
    author : {
        type :String,
        required : true
    },
    userId : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true,
    },
    topic : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    tags : {
        type : [String],
    },
    createdOn : {
        type : Date,
        required : true
    }
});



const Blog = mongoose.model("blog",blogSchema);

module.exports.Blog = Blog;