import type { NextAuthConfig } from 'next-auth';
import Keycloak from "next-auth/providers/keycloak"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from '@server/lib/prisma';

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/',
  },
  providers: [
    Keycloak
  ],
  session: {
    strategy: 'jwt'
  },
  useSecureCookies: process.env.NODE_ENV === 'production',
} satisfies NextAuthConfig;