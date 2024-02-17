import { compare } from "bcrypt";
import connectMongoDB from "../mongo/script";
import UserModel, { IUser } from "../models/UserSchema";

type UserLoginData = {
    username: string,
    password: string,
}

export const loginUser = async ({username, password}: UserLoginData ): Promise<IUser | null> => {
    
    await connectMongoDB();

    if(!username || !password) {
        throw new Error("Missing username or password")
    }

    const user: IUser | null = await UserModel.findOne({
        username
    })

    if(!user) {
        throw new Error(`Username ${username} does not exist`)
    }

    if(user.password) {
        const isValid = await compare(password, user.password)

        if(!isValid) {
            throw new Error("Incorrect password")
        }

    } else {
        throw new Error("Something went wrong")
    }
    
    return user
}