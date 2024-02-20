import Wallet from "@/libs/models/WalletSchema";
import connectMongoDB from "@/libs/mongo/script";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";



export const POST = async (request: NextRequest) => {
  try {
    await connectMongoDB();

    const session = await getServerSession(authOptions);
    const { name, currency } = await request.json();

    if(session){
      const wallet = await Wallet.create({ name, currency, balance: 0, user: session.user._id });
      
      return NextResponse.json({ message: `Wallet created successfully : ${wallet}` }, { status: 201 });
    }

  } catch(error) {

      return new NextResponse("Wallets POST Route-handler failed: " + error);
  }
};

export const GET = async () => {
  try {
    await connectMongoDB();

    const session = await getServerSession(authOptions);

    if(session){
      const id = session.user._id;
      const wallets = await Wallet.find({user: id});
      
      return new NextResponse(JSON.stringify(wallets));
    }

    return new NextResponse("User session not found", { status: 401 });
    

  } catch (error) {

    return new NextResponse("Wallet GET Route-handler failed: " + error);
  }
}; 

