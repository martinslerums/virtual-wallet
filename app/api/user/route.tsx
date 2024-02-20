// import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { hash } from "bcrypt";
// import UserModel from "@/libs/models/UserSchema";
// import connectMongoDB from "@/libs/mongo/script";
// import Wallet from "@/libs/models/WalletSchema";

// export const GET = async () => {
//   try {
//     await connectMongoDB()

//     const session = await getServerSession(authOptions);

//     console.log("Session from user get", session)

//     if (session) {
//       const  {_id: id, username} = session.user
//     }
    
//     if (!session) {
//         return NextResponse.json({
//             message: "You are not authorized"
//         })
//     }
    
  
//     const wallets = await Wallet.find();
//     const user = await UserModel.findOne(session.user.id)


//     return new NextResponse(JSON.stringify(wallets));
//   } catch (error) {

//   }

// };
