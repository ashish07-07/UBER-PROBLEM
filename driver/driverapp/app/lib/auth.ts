import NextAuth from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "../db";

import GoogleProvider from "next-auth/providers/google";

export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "bkashishh07@gmail.com",
        },
        password: { label: "Password", type: "text", placeholder: "123456" },
      },
      async authorize(credentials: any) {
        const email = credentials.email;
        const password = credentials.password;
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await prisma.user.findFirst({
          where: { email },
        });

        if (existingUser) {
          const passwordValidator = await bcrypt.compare(
            password,
            existingUser.password
          );

          if (passwordValidator) {
            return {
              id: existingUser.id.toString(),
              email: existingUser.email,
            };
          }
          return null;
        }

        try {
          const user = await prisma.user.create({
            data: {
              email,
              password: hashedPassword,
            },
          });

          return {
            id: user.id.toString(),

            email: user.email,
          };
        } catch (e) {}

        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub;
      session.role = "rider";

      return session;
    },
  },
};
