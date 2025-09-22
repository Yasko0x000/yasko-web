"use client";

import { useSession } from "next-auth/react";
import type { UserRole } from "@/types";

/**
 * Retourne le rôle de l'utilisateur connecté grâce au contexte NextAuth.
 */
export function useRole(): UserRole | null {
  const { data } = useSession();

  return data?.user?.role ?? null;
}
