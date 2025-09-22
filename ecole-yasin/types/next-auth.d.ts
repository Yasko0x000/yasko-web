import type { DefaultSession } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { UserRole } from "./index";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: UserRole;
      masterId?: string | null;
    };
  }

  interface User {
    id: string;
    role: UserRole;
    masterId?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole;
    masterId?: string | null;
  }
}
