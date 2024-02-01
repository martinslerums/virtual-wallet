import mongoose from "mongoose";
const { Schema } = mongoose;

const walletSchema = new Schema({
  name: String,
  balance: {
    type: Number, 
    default: 0
  },
  currency: String,
},
{
  timestamps: true,
});

const Wallet = mongoose.models.Wallet || mongoose.model("Wallet", walletSchema);

export default Wallet;