import {create} from 'zustand';
import axiosInstance from '../lib/axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set)=>({
    authUser: null, 
    isSigningUp:false,
    isLoggingIn:false,
    isCheckingAuth: true,

    signUp: async(data)=>{
        set({isSigningUp: true})
        try {
            const res = await axiosInstance.post('/auth/signup', data)
            set({authUser: res.data})    
        } catch (error) {
            console.log("Error in signup function in useAuthStore "+error.message)
        }finally{
            set({isSigningUp:false})
        }
    },
    logIn: async(data)=>{
        set({isLoggingIn: true})
        try {
            const res = await axiosInstance.post('/auth/login', data)
            set({authUser: res.data})
            toast.success("Login successful")    
        } catch (error) {
            console.log("Error in login function in useAuthStore "+error.message)
            toast.error("Login failed")
        }finally{
            set({isLoggingIn:false})
        }
    },
    checkAuth: async()=>{
        try {
            const res = await axiosInstance.get('/auth/check')  
            set({authUser: res.data})
        } catch (error) {
            console.log("Error in checkAuth in useAuthStore "+error.message)
            set({authUser: null})
        }finally{
            set({isCheckingAuth: false})
        }
    },
    logout: async()=>{
        try {
            const res = await axiosInstance.get("/auth/logout")
            set({authUser: null})
        } catch (error) {
            console.log("Error in logout function useAuthStore "+error.message)
        }
    }
}))