import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import { useFinStore } from "../store/financesStore";
import Navbar from "../components/Navbar";

const AddFinances = () => {
  const { authUser } = useAuthStore();
  const { addFinance } = useFinStore();

  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");
  const [flowType, setFlowType] = useState("expense");

  const validateFinData = () => {
    return (
      Number(amount) > 0 &&
      description.trim() !== "" &&
      place.trim() !== ""
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateFinData()) {
      toast.error("All fields are required!");
      return;
    }

    addFinance({
      userId: authUser._id,
      flowType,
      amount: Number(amount),
      description,
      place,
    });

    // Reset form
    setAmount(0);
    setDescription("");
    setPlace("");
    setFlowType("expense");

    toast.success("Finance added!");
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="p-6 max-w-2xl mx-auto bg-base-100 rounded-lg shadow mt-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Add Finances</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Toggle Income/Expense */}
          <div className="flex justify-center gap-4">
            <button
              type="button"
              className={`btn ${flowType === "income" ? "btn-primary" : "btn-ghost"}`}
              onClick={() => setFlowType("income")}
            >
              Income
            </button>
            <button
              type="button"
              className={`btn ${flowType === "expense" ? "btn-primary" : "btn-ghost"}`}
              onClick={() => setFlowType("expense")}
            >
              Expense
            </button>
          </div>

          {/* Amount */}
          <div>
            <label className="label">Amount</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter amount"
            />
          </div>

          {/* Description */}
          <div>
            <label className="label">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered w-full"
              placeholder="e.g. Dinner, Bus fare"
            ></textarea>
          </div>

          {/* Place */}
          <div>
            <label className="label">Place</label>
            <textarea
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="textarea textarea-bordered w-full"
              placeholder="e.g. Restaurant, Office"
            ></textarea>
          </div>

          <button type="submit" className="btn btn-success mt-4">
            Add Finance
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFinances;
