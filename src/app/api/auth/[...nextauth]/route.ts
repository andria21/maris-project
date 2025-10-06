import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import connect from "@/utils/db";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";

interface AuthUser extends User {
  id: string;
  name?: string;
  email: string;
}

interface MyToken {
  id?: string;
  accessToken?: string;
  refreshToken?: string;
  iat?: number;
  exp?: number;
  [key: string]: unknown;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password)
          throw new Error("Missing email or password");

        await connect();
        const user = await UserModel.findOne({ email: credentials.email });
        if (!user) throw new Error("User not found");

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordCorrect) throw new Error("Wrong credentials!");

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        } as AuthUser;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID2!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET2!,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/drive.file",
          access_type: "offline",
          prompt: "consent select_account",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) token.id = user.id;
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token; // now TS knows token.id exists
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
      }
      return session;
    },
  },

  pages: { error: "/" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
