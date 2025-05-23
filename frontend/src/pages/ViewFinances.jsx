import { useEffect } from "react"
import Navbar from "../components/Navbar"
import { useFinStore } from "../store/financesStore"

const ViewFinances = () => {
    const {finances, viewFinances, deleteFinance, updateFinance} = useFinStore()
    useEffect(() => {
        viewFinances()
    }, [viewFinances])
    console.log(finances)

    const handleDelete = (finId) => {
        deleteFinance(finId)
    }

    const handleUpdate = (finId) => {
        updateFinance(finId)
    }

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div>
                {finances.length>0 && (
                    <div>
                        <h1 className="text-3xl font-bold">View Finances</h1>
                        <div className="flex flex-col gap-5">
                            {finances.map((finance) => (
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
                                    <div>
                                        <h2 onClick={()=>handleUpdate(finance._id)} className="cursor-pointer text-blue-500">
                                            update
                                        </h2>
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