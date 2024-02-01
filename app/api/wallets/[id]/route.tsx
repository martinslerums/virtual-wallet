import Wallet from "@/libs/models/WalletSchema";
import connectMongoDB from "@/libs/mongo/script";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, {params: {id}}: Params) => {

  try {
    
    await connectMongoDB();
    const wallet = await Wallet.findById(id)
   
    console.log("API Response TransactionsALL:", JSON.stringify(wallet));

    return new NextResponse(JSON.stringify(wallet));

  } catch (error) {
    return new NextResponse("GET Route-handler for Wallets failed: " + error);
  }

}; 
