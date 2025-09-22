import type { UserRole } from "@/types";

interface NavLink {
  label: string;
  href: string;
}

const masterLinks: NavLink[] = [
  { label: "Tableau de bord", href: "/master/dashboard" },
  { label: "Ajouter un élève", href: "/master/dashboard#ajouter-eleve" }
];

const studentLinks: NavLink[] = [
  { label: "Mon tableau de bord", href: "/student/dashboard" },
  { label: "Mes rappels", href: "/student/dashboard#rappels" }
];

const publicLinks: NavLink[] = [
  { label: "Accueil", href: "/" },
  { label: "Se connecter", href: "/login" }
];

export const navigationLinks: Record<UserRole | "public", NavLink[]> = {
  master: masterLinks,
  student: studentLinks,
  public: publicLinks
};

export function getNavigation(role: UserRole | null): NavLink[] {
  if (!role) {
    return navigationLinks.public;
  }

  return navigationLinks[role];
}
