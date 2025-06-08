import { useEffect, useState } from "react"
import { useFinStore } from "../store/financesStore"

const Lifetimetotal = () => {
    const {finances, viewFinances} = useFinStore()
    const totalIncome = finances.filter((finance)=> finance.flowType === 'income')  
    const totalExpense = finances.filter((finance)=> finance.flowType === 'expense')  

    const [totalIncomeAmount, setTotalIncomeAmount] = useState(0)
    const [totalExpenseAmount, setTotalExpenseAmount] = useState(0)
    const [totalNetAmount, setTotalNetAmount] = useState(0)

    const calculateTotal = () =>{
        // const incomeAmount = totalIncome.reduce((acc, finance) => acc + finance.amount, 0)
        // const expenseAmount = totalExpense.reduce((acc, finance) => acc + finance.amount, 0)
        let income = 0
        let expense = 0

        totalIncome.forEach(fin=>{
            income+=fin.amount          
        })
        totalExpense.forEach(fin=>{
            expense+=fin.amount          
        })

        setTotalIncomeAmount(income)
        setTotalExpenseAmount(expense)      
        setTotalNetAmount(totalIncomeAmount-totalExpenseAmount)      
    }

    useEffect(() => {
      viewFinances()
    }, [viewFinances])
    

    useEffect(()=>{
      // console.log("Total Income Amount: ", totalIncomeAmount)
      // console.log("Total Income Amount: ", totalExpenseAmount)
      // console.log(totalIncome)
      // console.log(totalExpense)
      // console.log(finances)
      calculateTotal()
    }, [finances])
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mx-auto mt-6">
          <div>
              <h1 className="text-3xl font-bold">Lifetime Incomes/Expenses</h1>
          </div>
          <div>
              <div className="flex gap-5">
                  <div className="border p-5 rounded-lg">
                      <h2 className="text-xl font-bold">Total Income</h2>
                      <p className="text-green-500">₹ {totalIncomeAmount}</p>
                  </div>
                  <div className="border p-5 rounded-lg">
                      <h2 className="text-xl font-bold">Total Expense</h2>
                      <p className="text-red-500">₹ {totalExpenseAmount}</p>
                  </div>
              </div>
              <div className="border p-5 rounded-lg mt-5">
                  <h2 className="text-xl font-bold">Net Balance</h2>
                  <p className="text-blue-500">₹ {totalNetAmount}</p>
              </div>
          </div>
      </div>
    )
}

export default Lifetimetotal