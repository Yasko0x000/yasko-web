import { compare, hash } from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/mongodb";
import UserModel from "@/lib/models/User";
import type { UserRole } from "@/types";

/**
 * Hache un mot de passe en utilisant bcrypt.
 */
export async function hashPassword(password: string) {
  return hash(password, 10);
}

/**
 * Vérifie qu'un mot de passe correspond au hash enregistré.
 */
export async function verifyPassword(password: string, hashedPassword: string) {
  return compare(password, hashedPassword);
}

/**
 * Configuration NextAuth avec un provider "credentials" simple.
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Connexion École Ya-Sin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        await connectDB();
        const existingUser = await UserModel.findOne({ email: credentials.email })
          .select("+password")
          .lean();

        if (!existingUser?.password) {
          return null;
        }

        const passwordValid = await verifyPassword(credentials.password, existingUser.password);

        if (!passwordValid) {
          return null;
        }

        return {
          id: existingUser._id.toString(),
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role as UserRole,
          masterId: existingUser.masterId?.toString() ?? null,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role as UserRole;
        token.masterId = user.masterId ?? null;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = (token.role as UserRole) ?? "student";
        session.user.masterId = (token.masterId as string | null | undefined) ?? null;
      }

      return session;
    },
    async redirect({ baseUrl, url }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      return url;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

/**
 * Raccourci pour récupérer la session côté serveur dans les server components/actions.
 */
export function getCurrentSession() {
  return getServerSession(authOptions);
}
