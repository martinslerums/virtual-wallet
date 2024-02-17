import NextAuth, { DefaultSession } from "next-auth";
import { IUser } from "../libs/models/UserSchema";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: IUser & DefaultSession["user"];
  }
}

declare module "next-auth" {
  interface Session {
    user: IUser & DefaultSession["user"];
  }

  interface User {
    id?: string;
    username: string;
    password: string;
    createdAt?: string;
    updatedAt?: string;
  }
}

