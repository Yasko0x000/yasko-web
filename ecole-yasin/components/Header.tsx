"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRole } from "@/hooks/useRole";
import { getNavigation } from "@/lib/navigation";

const Header = () => {
  const pathname = usePathname();
  const role = useRole();
  const navItems = getNavigation(role);

  const isActive = (href: string) => pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-primary-dark">
          École Ya-Sin
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
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
      </div>
    </header>
  );
};

export default Header;
