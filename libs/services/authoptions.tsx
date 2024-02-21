import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/libs/services/auth";
import { NextAuthOptions } from "next-auth";

type Credentials = {
  username: string;
  password: string;
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials, req) {
        const { username, password } = credentials as Credentials;
        const user = await loginUser({ username, password });

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user._id = token.uid as string;
        session.user.username = token.username as string;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
        token.username = user.username;
      }
      return token;
    },
  },
};