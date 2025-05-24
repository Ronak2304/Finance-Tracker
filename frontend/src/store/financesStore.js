import toast from "react-hot-toast";
import { create } from "zustand";
import axiosInstance from "../lib/axios";

export const useFinStore = create((set,get)=>({
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
    },
    viewFinances: async()=>{
        try {
            const res = await axiosInstance.get('/finances/getFinance')
            set({finances: res.data})
        } catch (error) {
            console.log("Error in viewFinances function in useFinStore "+error.message)
            toast.error("Error in viewing finances")
        }
    },
    deleteFinance: async(finId)=>{
        try {
            const res = await axiosInstance.delete(`/finances/deleteFinance/${finId}`)
            get().viewFinances("Successfully deleted a transaction")
            toast.success()
        } catch (error) {
            console.log("Error in deleteFinance function in useFinStore "+error.message)
            toast.error("Error in deleting transaction")
        }
    },
    updateFinance: async(finId, data)=>{
        try {
            const res = await axiosInstance.put(`/finances/updateFinance/${finId}`, data)
            get().viewFinances()
            toast.success("Finance Updates Successfully")
        } catch (error) {
            console.log("Error in updateFinance function in useFinStore "+error.message)
            toast.error("Error in updating Transaction")
        }
    }
}))