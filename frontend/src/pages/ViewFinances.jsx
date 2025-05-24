import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { useFinStore } from "../store/financesStore"

const ViewFinances = () => {
    const {finances, viewFinances, deleteFinance, updateFinance} = useFinStore()
    const [searchedTransac, setSearchedTransac] = useState('')
    useEffect(() => {
        viewFinances()
    }, [viewFinances])
    console.log(finances)
    
    const filteredFinances = finances.filter((finance)=>{
        return finance.description.toLowerCase().includes(searchedTransac.toLowerCase())
    })

    const handleDelete = (finId) => {
        deleteFinance(finId)
    }

    // const handleUpdate = (finId) => {
    //     updateFinance(finId)
    // }

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div>
                {finances.length>0 && (
                    <div>
                        <h1 className="text-3xl font-bold">View Finances</h1>
                        <div className="flex gap-5">
                            <input type="text" className="border-2 border-solid border-black rounded-2xl w-2/3" onChange={(e)=>setSearchedTransac(e.target.value)}/>
                        </div>
                        <div className="flex flex-col gap-5">
                            {filteredFinances.map((finance) => (
                                <div>
                                    <div key={finance._id} className="border p-5 rounded-lg">
                                        <h2 className="text-xl font-bold">{finance.flowType}</h2>
                                        <p>Amount: {finance.amount}</p>
                                        <p>Description: {finance.description}</p>
                                        <p>Place: {finance.place}</p>
                                        <p>Date: {new Date(finance.createdAt).toLocaleDateString()}</p>
                                        <p>Time: {new Date(finance.createdAt).toLocaleTimeString()}</p>
                                        <div onClick={()=>handleDelete(finance._id)} className="cursor-pointer text-red-500">
                                            delete
                                        </div>
                                        {/* <div>
                                            <h2 onClick={()=>handleUpdate(finance._id)} className="cursor-pointer text-blue-500">
                                                update
                                            </h2>
                                        </div> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ViewFinances