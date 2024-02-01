import Transaction from "@/libs/models/TransactionSchema";
import Wallet from "@/libs/models/WalletSchema";
import connectMongoDB from "@/libs/mongo/script";
import { NextRequest, NextResponse } from "next/server";

export const GET = async ( request: NextRequest, { params: { id } }: Params) => {

  try {
    await connectMongoDB();

    const transaction = await Transaction.find({ wallet: id }).sort({ createdAt: -1 });;

    return new NextResponse(JSON.stringify(transaction));
  } catch (error) {
    
    return new NextResponse("GET request for blog comments failed " + error);
  }
};

export const POST = async (request: NextRequest, { params: { id } }: Params) => {
  
  try {
    await connectMongoDB();

    let { amount, description, type } = await request.json();
  
      if (amount > 0) {
        type = 'Deposit';
      } else {
        type = 'Withdraw';
      }   
      
    const wallet = await Wallet.findById(id);
    wallet.balance += amount;
    await wallet.save();
    
    await Transaction.create({ amount, description, type, wallet: id });
    
    return NextResponse.json({ message: "Transaction created" }, { status: 201 });
  } catch (error) {

    return new NextResponse("POST request for wallet transactions failed" + error);
  }
};

export const DELETE = async (request: NextRequest, { params: { id } }: Params) => {

  try {
    await connectMongoDB();

    const transaction = await Transaction.findByIdAndDelete(id)
    const wallet = await Wallet.findById(transaction.wallet);

    if (transaction.amount > 0) {
      wallet.balance -= transaction.amount;
    } else if (transaction.amount < 0) {
      wallet.balance += Math.abs(transaction.amount);
    }
    
    await wallet.save();

    return new NextResponse(JSON.stringify({message: 'Transaction deleted'}));
  } catch (error) {

    return new NextResponse("Error in deleting transaction from Database: " + error);
  } 
};
