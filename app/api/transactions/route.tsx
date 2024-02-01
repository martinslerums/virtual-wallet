import Transaction from "@/libs/models/TransactionSchema";
import connectMongoDB from "@/libs/mongo/script";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {

    await connectMongoDB();

    const transactions = await Transaction.find()
      .populate('wallet', "_id")
      .sort({ createdAt: -1 });

    return new NextResponse(JSON.stringify(transactions));

  } catch (error) {
    return new NextResponse("GET Route-handler for Wallets failed: " + error);
  }
}; 