const socket = require('socket.io');

module.exports = (app)=>{

    const allusers = socket.listen(app).of('blogs');
     
    allusers.on("connection",(user)=>{
        console.log("Someone connected");

        user.join("all")
        //after any user connects to this socket i.e "blogs" connection event is emitted by default and it returns socket associated with that user
        user.on("post",(blog)=>{
            console.log("got new post na demitting now");
            user.to('all').broadcast.emit("newPost",blog);
        });

        user.on("sample",(data)=>{
            user.to('all').broadcast.emit("new User",data+" Logged In");
        });

        user.on("delete",(blogId)=>{
            user.to('all').broadcast.emit("deleteClient",blogId);
        });
        user.on('disconnect', function () {
            user.leave('all');
        });
    });
}