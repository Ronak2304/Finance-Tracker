import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { useFinStore } from "../store/financesStore"

const ViewFinances = () => {
  const { finances, viewFinances, deleteFinance } = useFinStore()
  const [searchedTransac, setSearchedTransac] = useState("")

  useEffect(() => {
    viewFinances()
  }, [viewFinances])

  const filteredFinances = finances.filter((finance) =>
    finance.description.toLowerCase().includes(searchedTransac.toLowerCase())
  )

  const handleDelete = (finId) => {
    deleteFinance(finId)
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center ">View Finances</h1>

        {/* Search Bar */}
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search by description..."
            className="w-full max-w-xl px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setSearchedTransac(e.target.value)}
          />
        </div>

        {/* Finance List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredFinances.length > 0 ? (
            filteredFinances.map((finance) => (
              <div
                key={finance._id}
                className={`p-5 rounded-xl shadow-md border-l-4 ${
                  finance.flowType === "income"
                    ? "border-green-500 bg-green-50"
                    : "border-red-500 bg-red-50"
                }`}
              >
                <h2 className="text-xl font-semibold capitalize mb-2">
                  {finance.flowType}
                </h2>
                <p className="text-gray-700 mb-1">💰 Amount: ₹{finance.amount}</p>
                <p className="text-gray-700 mb-1">📝 Description: {finance.description}</p>
                <p className="text-gray-700 mb-1">📍 Place: {finance.place}</p>
                <p className="text-gray-500 text-sm">
                  📅 {new Date(finance.createdAt).toLocaleDateString()} &nbsp;
                  ⏰ {new Date(finance.createdAt).toLocaleTimeString()}
                </p>
                <button
                  onClick={() => handleDelete(finance._id)}
                  className="mt-3 text-sm text-red-600 hover:underline"
                >
                  🗑 Delete
                </button>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600 col-span-full">
              No transactions found.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewFinances
