import jwt from 'jsonwebtoken';
import User from '../model/user.js';

const protectRoute = async (req,res,next) =>{
    try {
        const token = req.cookies.jwtToken;
        if(!token){
            return res.status(401).json({message:"Unauthorizd Token"})
        }

        const decode = jwt.verify(token,process.env.JWT_SECRET);
        
        if(!decode){
            return res.status(401).json({message:'Unauthorized Token'})
        }

        const user = await User.findById(decode.userId).select('-password');

        if(!user){
            return res.status(401).json({message:"User Not found"})
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("Error in protectRoute middleware "+error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export default protectRoute;