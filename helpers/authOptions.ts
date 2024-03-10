//@ts-nocheck
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@/helpers/server-helpers";
import prisma from "@/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
   const origin =
        typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : '';
export const authOptions: NextAuthOptions = {
  
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", placeholder: "email" },
        password: { label: "Password", placeholder: "password" },
      },

      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        try {
          await connectToDatabase();
          const user = await prisma.user.findFirst({
            where: { email: credentials.email },
          });

          if (!user?.hashedPassword) {
            return null;
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );
          if (isPasswordCorrect) {
            return user;
          }
          return null;
        } catch (error) {
          console.log(error);
          return null;
        } finally {
          prisma.$disconnect();
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbackURL: "/book",
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        await connectToDatabase();
        try {
          const { name, email } = profile;
          if (!name || !email)
            return NextResponse.json(
              { message: "Invalid data" },
              { status: 422 }
            );
          await connectToDatabase();
          await prisma.user.create({ data: { email, name } });
          return NextResponse.redirect(200,"/book")

        } catch (error) {
          return NextResponse.json(
            { message: "Server Error" },
            { status: 500 }
          );
        } finally {
          await prisma.$disconnect();
        }
      }
      
      return true; // Do different verification for other providers that don't have `email_verified`
    },
     async redirect({ url, baseUrl }) {
          return baseUrl
        }
  },
  secret: process.env.NEXTAUTH_SECRET,
};

