import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from '~/auth.config';
import { z } from 'zod';
import AuthService from '@/server/resources/auth/auth.service';
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const authService = new AuthService();
          const user = await authService.signUp(parsedCredentials.data);

          return user;
        }
 
        return null;
      },
    }),
  ],
});