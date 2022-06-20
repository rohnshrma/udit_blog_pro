const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const mongoose = require("mongoose")


// middlewares 
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.set("view engine","ejs")

mongoose.connect("mongodb://localhost:27017/blog_uditDB")



// schema
const blogSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    content : {
        required: true,
        type: String
    }
})


// model
const Blog = new mongoose.model("Blog",blogSchema)




// routes

// compose 
app.get("/compose",(req,res)=>{
    res.render("compose")
})
app.post("/compose",(req,res)=>{
    const blog = new Blog({
        title: req.body.title,
        content: req.body.content
    })

    blog.save((err)=>{
        if(!err){
            console.log("Successfully Added")
            res.redirect("/blogs")
        }else{
            console.log(err);
            res.redirect("/compose")
        }
    });

})
// blogs

app.get("/blogs",(req,res)=>{
    res.render("blogs")
})


app.listen(3000,()=>{
    console.log("server started on port : 3000");
})