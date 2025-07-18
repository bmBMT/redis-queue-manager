import type { NextAuthConfig } from 'next-auth';
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from '@server/lib/prisma';

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [
    Google({

    }),
    GitHub({

    })
  ], // Add providers with an empty array for now
} satisfies NextAuthConfig;