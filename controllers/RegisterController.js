const Register = require("../models/Register");
const bcrypt = require('bcryptjs');

 const Registeration = async(req,res)=>{
    const {firstName,lastName,email,password} = req.body;

    try{
        const register = await Register.findOne({email});
        if(register){
           return res.status(401).json({message:"User Already Exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const reg = new Register({
            firstName,
            lastName,
            email,
            password:hashPassword
        })

        await reg.save();
        res.status(200).json({message:"User Register Successfully"})

    }catch(err){
        console.log("Internal Server error");
        res.status(500).json({message:"Internal Server Error"})
  
    }

}
const Login = async(req,res)=>{
    const {email,password} = req.body;
    try{
        const login_user = await Register.findOne({email});
        if(!login_user){
            return res.status(401).json({message:"Invalid User Email"})
        }

        const isMatch = await bcrypt.compare(password,login_user.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid User Password"})
        }
        
        res.status(200).json("Login Successfull")

    }catch(err){
        res.status(401).json({message:err.message})
    }
}
module.exports = {Registeration,Login};

// try {
//     let register = await Register.findOne({ email });
//     if (register) {
//         return res.status(400).json({ message: 'User already exists' });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     register = new Register({
//         firstName,
//         lastName,
//         email,
//         password: hashedPassword
//     });

//     await register.save();
//     res.status(201).json({ message: 'User registered successfully' });
// } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ message: 'Server error' });
// }