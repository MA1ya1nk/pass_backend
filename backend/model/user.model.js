import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = Schema({
   username: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true,
        index: true  //  if you want it in serching field of database basically you want database to use this field as searching index
    },
    email: {
       type: String,
       required: true,
       trim: true,
       index: true
    },
    password: {
        type: String,  // data store in string(encrypted) format
        required: [true, 'Password is required']
    },
    data: [{
       link: {
        type: String,
        required: true
       },
       linkPassword: {
        type: String,
        required: true
       },
       linkUsername: {
        type: String,
        required: true
       }
    }],
    refreshToken: {
        type: String,
    }
}
    
    ,{timestamp: true})

   
userSchema.pre("save", async function () {
  // if password field is not modified, skip hashing
  if (!this.isModified("password")) return ; // isModified is a method

  // hash password
  this.password = await bcrypt.hash(this.password, 10);

});


// mongoose also provide method just like middleware
// dcrypting the passwpord
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(  // this generate token
        {
            _id: this._id, // mongodb id
            email: this.email,
            username: this.username
        },

        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
    

export const User = mongoose.model("User", userSchema)    