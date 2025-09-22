"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useRole } from "@/hooks/useRole";
import { getNavigation } from "@/lib/navigation";

/**
 * Bouton de déconnexion simple.
 */
const SignOutButton = () => (
  <button
    type="button"
    onClick={() => signOut({ callbackUrl: "/" })}
    className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-primary hover:text-primary"
  >
    Se déconnecter
  </button>
);

const Header = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = useRole();
  const navItems = getNavigation(role);

  const isActive = (href: string) => pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-primary-dark">
          École Ya-Sin
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors ${isActive(item.href) ? "text-primary-dark" : "text-slate-600 hover:text-primary"}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {session?.user && <SignOutButton />}
        </div>
      </div>
    </header>
  );
};

export default Header;
