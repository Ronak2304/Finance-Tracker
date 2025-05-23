import toast from "react-hot-toast";
import { create } from "zustand";
import axiosInstance from "../lib/axios";

export const useFinStore = create((set)=>({
    finances: [],
    addFinance: async(data)=>{
        try {
            const res = await axiosInstance.post('/finances/addFinance', data)
            set((state)=>(
                {finances: [res.data, ...state.finances]}
            ))
            toast.success("Finance Added Successfully")
        } catch (error) {
            console.log("Error in addFinance function in useFinStore "+error.message)
            toast.error("Error in adding finance")
        }
    }
}))