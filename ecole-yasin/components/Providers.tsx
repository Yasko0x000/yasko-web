"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

interface ProvidersProps {
  children: React.ReactNode;
  session?: Session | null;
}

/**
 * Fournit le contexte NextAuth à l'ensemble de l'application côté client.
 */
const Providers = ({ children, session }: ProvidersProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Providers;
