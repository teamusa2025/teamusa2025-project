// next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's name. */
      name?: string | null;
      /** The user's email address. */
      email?: string | null;
      /** The user's profile image. */
      image?: string | null;
      /** The user's username. */
      username: string;
      /** The user's subrole. */
      subrole: Subrole;
    };
  }
}
