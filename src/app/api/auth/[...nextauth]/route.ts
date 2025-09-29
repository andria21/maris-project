// src/pages/api/auth/[...nextauth].ts  (or /app/api/auth/[...nextauth]/route.ts for App Router)
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connect from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

// Define a TypeScript type for your user object returned by authorize
interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

// NextAuth options
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Missing email or password");
        }

        await connect();

        const user = await User.findOne({ email: credentials.email });

        if (!user) throw new Error("User not found");

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) throw new Error("Wrong Credentials!");

        // Return a plain object with id/email/name
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        } as AuthUser;
      },
    }),
  ],
  pages: {
    error: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = (user as AuthUser).id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },
};

// For App Router export
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// For Pages Router (if using /pages/api) use:
// export default NextAuth(authOptions);
