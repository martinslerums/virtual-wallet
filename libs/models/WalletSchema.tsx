import mongoose from "mongoose";
const { Schema } = mongoose;

const walletSchema = new Schema({
  name: {
    type: String, 
    required: true,
    unique: true
  },
  balance: {
    type: Number, 
    default: 0
  },
  currency: {
    type: String, 
    required: true
  },
},
{
  timestamps: true,
});

const Wallet = mongoose.models.Wallet || mongoose.model("Wallet", walletSchema);

export default Wallet;