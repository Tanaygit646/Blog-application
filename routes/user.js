const express = require("express");
const User = require("../models/user")
const router = express.Router()

router.get("/signin",(req,res)=>{
    res.render("signin");
})

router.get("/signup",(req,res)=>{
    res.render("signup")
})

router.post("/signup", async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const user = new User({ fullName, email, password });
        await user.save();
        res.redirect("/home");
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

router.post("/signin",async (req,res)=>{
    try{
        const {email,password}=req.body;
        const exixtingUser = await User.findOne({email});
        if(exixtingUser) return res.redirect("/");

    }catch(err){
        return res.status(401).json({msg:"No person found"})
    }
})


module.exports = router;