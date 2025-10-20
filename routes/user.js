const express = require("express");
const User = require("../models/user")
const router = express.Router()
const {createHmac} = require("crypto");
const {createTokenForUser} = require("../services/authentication");
const { error } = require("console");

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

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(400).send("User not found");

    const hashedPassword = createHmac("sha256", existingUser.salt)
      .update(password)
      .digest("hex");

    if (hashedPassword !== existingUser.password)
      return res.status(401).send("Invalid password");

    const token = createTokenForUser(existingUser);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.render("signin",{
        error:"Incorrect password or gmail"
    })
    
  }
});



module.exports = router;