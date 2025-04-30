import generateToken from '../lib/token.js'
import User from '../model/user.js'
import bcrypt from 'bcryptjs'
import cloudinary from '../lib/cloudinary.js'


export const signup = async (req,res)=>{
    const {fullName,email,password} = req.body
    try {
        if(!fullName || !email || !password){
            return res.status(400).json({message:"All fields are required"}) // 400 Bad Request - invald data 
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must be at least of 6 characters long"})
        }
        const checkUser = await User.findOne({email});
        if(checkUser){
            return res.status(400).json({message:"User already exists"})
        }

        const salt = await bcrypt.genSalt() // by default it is 10 thus have not specified any number 
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullName:fullName,
            email:email,
            password:hashedPassword
        })

        if(!newUser){
            return res.status(400).json({message:'User not created'})
        }
        generateToken(newUser._id,res);
        await newUser.save()
        return res.status(201).json({
            userId:newUser._id,
            fullName:newUser.fullName,
            email:newUser.email,
            profilePic:newUser.profilePic,
        })
    } catch (error) {
        console.log("Error in signup controller "+error.message)
        res.status(500).json({message:"Internal Server error"})
    }
}
export const login = async (req,res)=>{
    const {email,password} = req.body
    try {
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"})
        }
        if(password.length<6){
            return res.status(400).json({message:'Invalid Credentials'})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message:'Invalid Credentials'
            })
        }
        const passwordTest = await bcrypt.compare(password,user.password);
        if(!passwordTest){
            return res.status(400).json({
                message:'Invalid Credentials'
            })
        }
        generateToken(user._id,res);
        return res.status(200).json({
            userId:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,
        })
    } catch (error) {
        console.log("Error in login controller "+error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}
export const logout = async (req,res)=>{
    try {
        res.cookie("jwtToken","",{
            maxAge:0
        })
        return res.status(200).json({
            message:"Logged out successfully"
        })
    } catch (error) {
        console.log("Error in logout controller "+error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}
export const updateProfile = async (req,res)=>{
    const {newprofilePic} = req.body
    const userId = req.user._id
    try{
        if(!newprofilePic){
            return res.status(400).json({message:"profilePic is required"})
        }

        const upload = await cloudinary.uploader.upload(newprofilePic)
        const updatedUser = await User.findByIdAndUpdate(userId,{
            profilePic:upload.secure_url
        },{
            new:true
        })

        res.status(201).json(updatedUser)

    }catch(error){
        console.log("Error in updateProfile controller "+error.message)
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}
export const checkAuth = async (req,res)=>{
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller "+error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}