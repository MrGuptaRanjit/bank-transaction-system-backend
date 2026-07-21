const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,"email is required to create a user"],
        trim: true,
        lowercase: true,
        match: [ /^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Invalid Email Address"],
        unique: [true, "Email Already Exist"]
    },
    password:{
        type:String,
        required: [true,"password is required to create an account"],
        minlength:[6,"password should contain more than 6 characters"],
        select: false
    },
     name:{
        type: String,
        required: [true,"name is required to create an account"]
    },
    systemUser:{
        type: Boolean,
        default: false,
        immutable: true,
        select: false
    }
},{
    timestamps: true
})

userSchema.pre("save", async function(){
    if(!this.isModified("password")){
        return
    }

    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    return 
})

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password)
}

const userModel = mongoose.model("user", userSchema)

module.exports = userModel