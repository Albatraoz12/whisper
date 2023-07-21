import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/app/libs/prismaConn';
import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

const loginUserSchema = z.object({
  email: z
    .string()
    .regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g, 'invalid email'),
  password: z.string().min(5, 'password must be 5 characters long'),
});

export const authOpstions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'text', placeholder: 'test@test.com' },
        password: { type: 'password', placeholder: 'AwesomePassword' },
      },
      async authorize(credentials, req): Promise<any> {
        const { email, password } = loginUserSchema.parse(credentials);
        const user = await prisma.user.findUnique({
          where: { email },
        });

        console.log('user:', user);

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.email = token.email;
      return session;
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.username = user.username;
        token.email = user.email;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOpstions);

export { handler as GET, handler as POST };
