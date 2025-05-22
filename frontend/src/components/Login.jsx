import { useState } from 'react'
import { useAuthStore } from '../store/authStore'

const Login = () => {
    const {authUser, logIn, isLoggingIn} = useAuthStore()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    function validateForm(){
        if(email.trim()==="" || password.trim()===""){
        console.log("All fields are required")
        return false;
        }
        if(password.trim().length<6){
        console.log("Password must be min of 6 chars")
        return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
        console.log("Invalid email format");
        return false;
        }
        return true
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        if(validateForm()){ 
            logIn({
                email: email,
                password: password
            }) 
            
            if(authUser){
                console.log("Login successful")
            }

            setEmail('')
            setPassword('')
        }
    }
    return (
    <div className='flex justify-center items-center h-screen'>
        <div className='border-2 border-solid border-black rounded-2xl shadow-lg '>
            <div className='p-5'>
                <h1 className='text-4xl font-bold text-center'>Login</h1>
            </div>
            <div className='p-5'>
                <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                    <div className='flex gap-10 justify-between items-center'>
                        <h1>Enter Your Email:</h1>
                        <input className='border-2 border-solid boreder-black rounded-2xl p-1 pl-2' type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className='flex gap-10 justify-between items-center'>
                        <h1>Enter Your Password:</h1>
                        <input className='border-2 border-solid boreder-black rounded-2xl p-1 pl-2' type="text" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div>
                        Don't Have an Account? <a href="/signup" className='text-blue-500'>Sign Up</a>
                    </div>
                    <div className='flex gap-10 items-center justify-center'>
                        <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded-2xl' type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login