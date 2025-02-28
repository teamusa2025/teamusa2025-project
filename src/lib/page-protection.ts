import { redirect } from 'next/navigation';
import { Subrole } from '@prisma/client';

/**
 * Redirects to the login page if the user is not logged in.
 */
export const loggedInProtectedPage = (session: { user: { email: string; id: string; randomKey: string } } | null) => {
  if (!session) {
    redirect('/auth/signin');
  }
};

/**
 * Redirects to the login page if the user is not logged in.
 * Redirects to the not-authorized page if the user is not an admin.
 */
export const adminProtectedPage = (
  session: { user: { email: string; id: string; randomKey: string; subrole: Subrole } } | null,
) => {
  loggedInProtectedPage(session);
  if (session && session.user.subrole !== Subrole.ADMIN) {
    redirect('/not-authorized');
  }
};

/**
 * Redirects to the login page if the user is not logged in.
 * Redirects to the not-authorized page if the user is not an analyst.
 */
export const analystProtectedPage = (
  session: { user: { email: string; id: string; randomKey: string; subrole: Subrole } } | null,
) => {
  loggedInProtectedPage(session);
  if (session && session.user.subrole !== Subrole.ANALYST) {
    redirect('/not-authorized');
  }
};

/**
 * Redirects to the login page if the user is not logged in.
 * Redirects to the not-authorized page if the user is not an auditor.
 */
export const auditorProtectedPage = (
  session: { user: { email: string; id: string; randomKey: string; subrole: Subrole } } | null,
) => {
  loggedInProtectedPage(session);
  if (session && session.user.subrole !== Subrole.AUDITOR) {
    redirect('/not-authorized');
  }
};

/**
 * Redirects to the login page if the user is not logged in.
 * Redirects to the not-authorized page if the user is not an executive.
 */
export const executiveProtectedPage = (
  session: { user: { email: string; id: string; randomKey: string; subrole: Subrole } } | null,
) => {
  loggedInProtectedPage(session);
  if (session && session.user.subrole !== Subrole.EXECUTIVE) {
    redirect('/not-authorized');
  }
};
