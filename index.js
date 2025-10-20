const express = require("express");
const path = require("path");
const router = require("./routes/user");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const {checkAuth} = require("./middleware/auth");
const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieparser())
app.use((req, res, next) => {
  res.locals.error = null;
  res.locals.user = null;
  next();
});


app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

mongoose.connect("mongodb://127.0.0.1:27017/blogify")
.then(e => console.log("db has connected"))
.catch(err => console.log("Error to connect db"))

app.get('/',(req,res)=>{
    res.render("home")
})
app.use("/user",router)
app.get("/home", checkAuth, (req, res) => {
  res.render("/", { user: req.user });
});

const port = 2000;
app.listen(port,()=> console.log(`http://localhost:${port}`));
