import { model, Schema, trusted } from "mongoose";

const financeSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    flowType: {
        type: String,
        enum: ["income", "expense"],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    place: {
        type: String,
    }
},{
    timestamps: true
})

const Finances = model("Finances", financeSchema)
export default Finances;