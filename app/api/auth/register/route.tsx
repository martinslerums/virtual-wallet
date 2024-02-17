import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import UserModel from "@/libs/models/UserSchema";
import connectMongoDB from "@/libs/mongo/script";

export const POST = async (request: NextRequest) => {
  try {
    await connectMongoDB();

    const { username, password } = await request.json();
    const passwordHash = await hash(password, 10);
    
    const user = await UserModel.create({username, password: passwordHash});

    return NextResponse.json({ message: `User created: ${user}` }, { status: 201 });
  } catch (error) {

    return new NextResponse("POST request for wallet transactions failed" + error);
  }
};
