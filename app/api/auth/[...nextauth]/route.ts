import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import { z } from "zod";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          type: "text",
        },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const { email: inputEmail, password: inputPassword } =
          credentialsSchema.parse(credentials);

        const TargetUser = await prisma.user.findUnique({
          where: {
            email: inputEmail,
          },
        });

        if (!TargetUser || !TargetUser?.password) {
          throw new Error("User not found");
        }

        const passwordIsMatch = await bcrypt.compare(
          inputPassword,
          TargetUser.password
        );
        if (!passwordIsMatch) {
          throw new Error("Incorrect username/password");
        }
        return TargetUser;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
