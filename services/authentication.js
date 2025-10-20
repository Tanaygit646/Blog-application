const { escapeXML } = require("ejs")
const jwt = require("jsonwebtoken")
const secret_key = "Tanay@20000"

function createTokenForUser(user){
    const payload = {
        _id:user._id,
        email:user.email,
        profileImage:user.profileImage,
        role:user.role
    };
    const token = jwt.sign(payload,secret_key);
    return token;
}

function validateToken(token){
    try{
        const payload = jwt.verify(token,secret_key);
        return payload;
    }catch(err){
        return null;
    }    
}

module.exports = {createTokenForUser,validateToken};