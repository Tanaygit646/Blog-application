const express = require("express");
const path = require("path");
const router = require("./routes/user");
const mongoose = require("mongoose");
const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

mongoose.connect("mongodb://127.0.0.1:27017/blogify")
.then(e => console.log("db has connected"))
.catch(err => console.log("Error to connect db"))

app.get('/',(req,res)=>{
    res.render("home")
})
app.use("/user",router)
const port = 50000;
app.listen(port,()=> console.log(`http://localhost:${port}`));
