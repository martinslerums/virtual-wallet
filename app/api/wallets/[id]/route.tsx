import Transaction from "@/libs/models/TransactionSchema";
import Wallet from "@/libs/models/WalletSchema";
import connectMongoDB from "@/libs/mongo/script";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params: {id} }: Params) => {
  try {
    
    await connectMongoDB();

    const wallet = await Wallet.findById(id)
    // console.log("API Response TransactionsALL:", JSON.stringify(wallet));

    return new NextResponse(JSON.stringify(wallet));
  } catch (error) {

    return new NextResponse("GET Route-handler for Wallets failed: " + error);
  }

}; 

export const PATCH = async (request: NextRequest, { params: { id } }: Params) => {
  try {

    await connectMongoDB();
    
    const requestBody = await request.json();
    // console.log('Received payload from client:', requestBody);

    const editWallet = await Wallet.findByIdAndUpdate(id, requestBody,  { new: true });

    return new NextResponse(JSON.stringify(editWallet));
  } catch (error) {
    
    return new NextResponse("Error in editing blog in MongoDB: " + error);
  }
};

export const DELETE = async (request: NextRequest, { params: { id } }: Params) => {
  try {

    await connectMongoDB();

    await Transaction.deleteMany({ wallet: id });
    const wallet = await Wallet.findByIdAndDelete(id)

    return new NextResponse(JSON.stringify(wallet));
  } catch (error) {

    return new NextResponse("Wallet DELETE Route-handler failed: " + error);
  }
};
