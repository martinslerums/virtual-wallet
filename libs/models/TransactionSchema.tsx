import mongoose from "mongoose";
const { Schema } = mongoose;

const transactionSchema = new Schema({
  description: String,
  amount: Number,
  type: String,
  wallet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wallet",
  },
},
{
  timestamps: true,
});

const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);

export default Transaction;