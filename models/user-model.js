const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
 username:{
    type:String,
    require:true,
 },
 email:{
    type:String,
    require:true,
 },
 phone:{
    type:String,
    require:true,
 },
 password:{
    type:String,
    require:true,
 },
 isAdmin:{
    type: Boolean,
    default: false,
 },
})

//the other way of secuirng a pswrd with bcrypt

userSchema.pre('save', async function(next){
  const user = this;    // this will give the data like everything user pswrd and all the data like postman response, console log and check


  if(!user.isModified('password')){ // if pswrd not changed then next step and next step is to store in the database
   next()
  }

  // if pswrd is new or modified 

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound)
    user.password = hash_password
  } catch (error) {
   next(error)
  }
})





// json web token
userSchema.methods.generateToken = async function() {
 try {
   return jwt.sign({
      userId : this._id.toString(),
      email: this.email,
      isAdmin: this.isAdmin,
   },
process.env.JWT_KEY, {
   expiresIn : "30d"
}
)
 } catch (error) {
   console.error(error)
 }
}


// compare password 

userSchema.methods.comparePassword = async function(password){
   return bcrypt.compare(password, this.password)
}



// define the model or the collection name 

const User = new mongoose.model("User", userSchema)


module.exports = User;