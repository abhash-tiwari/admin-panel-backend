const User = require("../models/user-model")
const bcrypt = require("bcryptjs")

const home = async (req, res) => {
    try {
        res.status(200).send("welcome using router");
    } catch (error) {
        console.log(error);
    }
};

const register = async (req, res) => {
    try {
        console.log("Register endpoint hit");
        console.log(req.body);
        const {username,email,phone,password} = req.body

        // we have to see if these values exist in our database or not registered or not 




        const userExist = await User.findOne({email : email})

        if(userExist){
            return res.status(400).json({msg: "email already exist"})
        }




 // if pswrd do not match
 // hash the pswrd
//  const saltRound = 10;
//  const hash_password = await bcrypt.hash(password, saltRound)     we have to use password:hash_password below but theres other way as well in user scema 
 
 
        const createdUser = await User.create({username,email,phone,password})

        res.status(201).json({msg : 'registration successfull', token : createdUser.generateToken(), userId : createdUser._id.toString()});
    } catch (error) {
        res.status(400).send({ msg: "page not found" });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const userExist = await User.findOne({email})
        console.log(userExist);
        

        if(!userExist){
            res.status(400).json({msg: "Invalid Credentials"})
        }

        // now if a user exist then compare the pswrd

        // const user = await bcrypt.compare(password, userExist.password)
        // we will use methods function for this bcrypt compare too 

        const user = await userExist.comparePassword(password)

        if(user){
            res.status(200).json({msg : 'login successfull', token : userExist.generateToken(), userId : userExist._id.toString()});
        } else {
            res.status(401).json({msg: "Invalid Email or Password"})
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "not found"})
    }
}

module.exports = { home, register, login };
