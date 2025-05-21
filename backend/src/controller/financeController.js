import Finances from "../model/finances.js";

export const addFinance = async (req,res) => {
    const userId = req.user._id;
    const {flowType, amount, description, place} = req.body;
    try{
        if(!flowType || !amount || !description){
            return res.status(400).json({message: "All field are required except place"});
        }
        if(flowType.toLowerCase() !== "income" && flowType.toLowerCase() !== "expense"){
            return res.status(400).json({message: "Flow type should be either income or expense"});
        }
        if(amount<=0){
            return res.status(400).json({message:"Amount should greater than 0"});
        }

        const financeDailyData = new Finances({
            userId: userId, 
            flowType: flowType.toLowerCase(),
            amount: amount,
            description: description,
            place: place? place: "" 
        })

        if(!financeDailyData){
            return res.status(400).json({message: "Error in creating finance data"});
        }
        await financeDailyData.save();
        return res.status(201).json(financeDailyData);
    }catch(error){
        console.log("Error in addFinance controller "+error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const viewFinance = async (req,res) =>{
    const userId = req.user._id;
    try {
        const userFinanceData = await Finances.find({userId}).sort({createdAt: -1}); // sort createdAt: -1 implies sorted for latest first createdAt:1 would imply sort by oldest first 
        if(!userFinanceData){
            return res.status(400).json({message: "No data found for particular user"});
        }
        return res.status(200).json(userFinanceData);
    } catch (error) {
        console.log("Error in viewFinance controller "+error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const deleteFinance = async (req, res)=>{
    const {finId} = req.params
    try{
        if(!finId){
            return res.status(400).json({message: "FinId not present"})
        }
        const financeData = await Finances.findByIdAndDelete(finId);
        if(!financeData){
            return res.status(400).json({message: "Data Not Found"})
        }
        return res.status(200).json({message: "Data Deleted Successfully"})
    }catch(error){
        console.log("Error in deleteFinance Controller "+error.message);
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const updateFinance = async (req, res)=>{
    const {finId} = req.params
    const {flowType, amount, description, place} = req.body;

    try{
        if(!finId){
            return res.status(400).json({message:"finId not present"})
        }
        if(!flowType && !amount && !description && !place){
            return res.status(400).json({message: "Atleast one field is required"})
        }

        const financeEntry = await Finances.findById(finId);
        if(!financeEntry){
            return res.status(400).json({message: "No record found"})
        }
        if(flowType){
            if(flowType.toLowerCase() !== "income" && flowType.toLowerCase() !== "expense"){
                return res.status(400).json({message: "Flow type should be either income or expense"});
            }
            const updateEntry = await Finances.findByIdAndUpdate(finId,{
                flowType: flowType.toLowerCase()
            })
        }
        if(amount){
            if(amount<=0){
                return res.status(400).json({message:"Amount should greater than 0"});
            }
            const updateEntry = await Finances.findByIdAndUpdate(finId,{
                amount: amount
            })
        }
        if(description){
            const updateEntry = await Finances.findByIdAndUpdate(finId,{
                description: description
            })
        }
        if(place){
            const updateEntry = await Finances.findByIdAndUpdate(finId,{
                place: place
            })
        }
        const updatedFinance = await Finances.findById(finId);
        return res.status(200).json(updatedFinance);
    }catch(error){
        console.log("Error in updateFinance Controller "+error.message)
        return res.status(500).json({message: "Internal Server Error"})
    }
}