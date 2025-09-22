"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import type { UserRole } from "@/types";

export function useRole(): UserRole | null {
  const pathname = usePathname();

  return useMemo(() => {
    if (!pathname) {
      return null;
    }

    if (pathname.startsWith("/master")) {
      return "master";
    }

    if (pathname.startsWith("/student")) {
      return "student";
    }

    return null;
  }, [pathname]);
}
