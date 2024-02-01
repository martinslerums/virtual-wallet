import Wallet from "@/libs/models/WalletSchema";
import connectMongoDB from "@/libs/mongo/script";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (request: NextRequest) => {
  try {

    await connectMongoDB();

    const { name, currency } = await request.json();

    await Wallet.create({ name, currency , balance: 0});
  
    return NextResponse.json({ message: "Wallet created" }, { status: 201 });

  } catch(error) {
      return new NextResponse("POST Route-handler for Wallets failed: " + error);
  }
};


export const GET = async () => {
  try {

    await connectMongoDB();

    const wallets = await Wallet.find()

    return new NextResponse(JSON.stringify(wallets));

  } catch (error) {
    return new NextResponse("GET Route-handler for Wallets failed: " + error);
  }
}; 

