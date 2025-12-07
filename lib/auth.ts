import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

declare module "next-auth" {
  interface User {
    role?: string;
  }
  interface Session {
    user: {
      email: string;
      role?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}

const config = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const { PrismaClient } = await import("@prisma/client");
          const { PrismaPg } = await import("@prisma/adapter-pg");
          const { Pool } = await import("pg");

          const pool = new Pool({
            connectionString: process.env.DATABASE_URL,
          });

          const adapter = new PrismaPg(pool);
          const prisma = new PrismaClient({
            adapter,
          });

          const admin = await prisma.adminUser.findUnique({
            where: { email: credentials.email as string },
          });

          await prisma.$disconnect();

          if (!admin || !admin.isActive) {
            return null;
          }

          const isPasswordValid = await compare(
            credentials.password as string,
            admin.password
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: admin.id.toString(),
            email: admin.email,
            role: admin.role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const nextAuthHandler = NextAuth(config);

// NextAuth v4.24 exports GET and POST directly on the result
export const { GET, POST } = nextAuthHandler;
export const { auth, signIn, signOut } = nextAuthHandler;

// Create handlers object for route export
export const handlers = nextAuthHandler;
