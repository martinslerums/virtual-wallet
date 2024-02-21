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

// export const PATCH = async (request: NextRequest, { params: { id } }: Params) => {
//   try {
//     await connectMongoDB();

//     const { fraudulent } = await request.json();

//     let updatedType;

//     if (fraudulent) {
//       updatedType = 'Fraudulent';
//     } else {
//       const transaction = await Transaction.findById(id);
//       if (!transaction) {
//         return new NextResponse(`Transaction with ID ${id} not found`, { status: 404 });
//       }
      
//       updatedType = transaction.amount > 0 ? 'Deposit' : 'Withdraw';
//     }

//     const updatedTransaction = await Transaction.findByIdAndUpdate(id, { type: updatedType });

//     if (!updatedTransaction) {
//       return new NextResponse(`Transaction with ID ${id} not found`, { status: 404 });
//     }

//     return new NextResponse(JSON.stringify({ message: 'Transaction updated' }));
//   } catch (error) {
//     return new NextResponse(`PATCH request for updating transaction failed: ${error}`, { status: 500 });
//   }
// };
