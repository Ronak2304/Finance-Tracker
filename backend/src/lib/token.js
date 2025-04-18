import jwt from 'jsonwebtoken';

const generateToken = (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: '7d'
    })

    res.cookie("jwtToken",token,{
        maxAge: 7*24*60*60*1000,
        httpOnly:true,
        secure: process.env.PROJ_ENV !== "development",
        sameSite: "strict"
    })
    return token
}

export default generateToken