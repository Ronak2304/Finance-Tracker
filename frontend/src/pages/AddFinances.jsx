import { useState } from "react"
import { useAuthStore } from "../store/authStore"
import toast from "react-hot-toast"
import { useFinStore } from "../store/financesStore"
import Navbar from "../components/Navbar"

const AddFinances = () => {
    const {authUser} = useAuthStore()
    const {addFinance} = useFinStore()
    const [amount, setAmount] = useState(0)
    const [description, setDescription] = useState('')
    const [place, setPlace] = useState('')
    const [flowType, setFlowType] = useState('expense')
    
    function validateFinData(){
        if(Number(amount)<=0){
            return false
        }
        if(description.trim()===""){
            return false
        }
        if(place.trim()===""){
            return false
        }
        return true
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!validateFinData()){
            toast.error("All fields are required!")
        }

        addFinance({
            userId: authUser._id,
            flowType: flowType,
            amount: Number(amount),
            description: description,
            place: place
        })
        
        setAmount(0)
        setDescription('')
        setPlace('')
        setFlowType('expense')
    }

    return (
        <div>
            <Navbar />
            <div>
                <h1 className="text-3xl font-bold">Add Finances</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="flex gap-10">
                        <h2 style={{backgroundColor: flowType==="income"? "lightblue":""}} className="p-2 rounded-lg cursor-pointer" onClick={()=>setFlowType("income")}>
                            Income
                        </h2>
                        <h2 style={{backgroundColor: flowType==="expense"? "lightblue":""}} className="p-2 rounded-lg cursor-pointer" onClick={()=>setFlowType("expense")}>
                            Expense
                        </h2>
                    </div>

                    <div>
                        <h1>Enter Amount:</h1>
                        <input className="border-2 border-solid boreder-black rounded-2xl p-1 pl-2" type="text" value={amount} onChange={(e)=>setAmount(e.target.value)}/>
                    </div>

                    <div>
                        <h1>Enter Description:</h1>
                        <textarea className="border-2 border-solid boreder-black rounded-2xl p-1 pl-2" type="text" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                    </div>
                    <div>
                        <h1>Enter Place:</h1>
                        <textarea className="border-2 border-solid boreder-black rounded-2xl p-1 pl-2" type="text" value={place} onChange={(e)=>setPlace(e.target.value)}/>
                    </div>

                    <div>
                        <button className="bg-blue-500 text-white p-2 rounded-lg" type="submit">
                            Add Finance
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddFinances