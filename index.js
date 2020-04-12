const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const body_parser = require('body-parser');
const corsLib = require('./server/lib/corsLib');
const socketLib = require('./server/lib/socketLib');

const user = require('./server/routes/users');
const blog = require('./server/routes/blogs');

const app = express();

app.use(express.json());
app.use(body_parser.urlencoded({extended:false}));

app.use(corsLib);

app.use("/user",user);
app.use("/blog",blog);


mongoose.connect("mongodb://localhost/Blog",{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true})
    .then(()=>{console.log("db connected Successfully")})
    .catch((err)=>{console.log(err)});

const server = http.createServer(app);
server.listen(3000,()=>{
    console.log("listening on 3000");
});

socketLib(server);