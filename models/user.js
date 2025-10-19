const {Schema,model} = require("mongoose")
const {createHmac,randomBytes} = require("crypto")

const userSchema = new Schema({
    fullName:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    salt:{
        type:String,
        required: false
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type:   String,
        enum:["USER","ADMIN"],
        default:"USER"
    },
    profileImageUrl:{
        type: String,
        default:'/public/image.jpeg'
    }

},{timestamps:true});

userSchema.pre("save", function(next) {
    if (!this.isModified("password")) return next();

    const salt = randomBytes(16).toString("hex");
    const hashedPassword = createHmac("sha256", salt).update(this.password).digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
});


const User = model('user',userSchema);
module.exports = User;