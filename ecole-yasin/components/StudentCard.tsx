import Link from "next/link";
import type { DashboardStudent } from "@/types";
import ProgressItem from "@/components/ProgressItem";

interface StudentCardProps {
  student: DashboardStudent;
  href?: string;
}

/**
 * Affiche une synthèse d'un élève avec ses dernières révisions.
 */
const StudentCard = ({ student, href }: StudentCardProps) => {
  const latestProgress = student.progress.slice(0, 2);

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <header className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-primary-dark">{student.name}</h3>
        <p className="text-sm text-slate-500">{student.email}</p>
        <p className="text-xs text-slate-400">Inscrit le {new Date(student.createdAt).toLocaleDateString("fr-FR")}</p>
      </header>

      <section className="space-y-3">
        <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Progrès récents</h4>
        <div className="grid gap-2">
          {latestProgress.length === 0 && (
            <p className="text-xs text-slate-500">Aucune progression enregistrée pour le moment.</p>
          )}
          {latestProgress.map((progress) => (
            <ProgressItem key={progress.id} progress={progress} compact />
          ))}
        </div>
      </section>

      {href && (
        <footer>
          <Link
            href={href}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark"
          >
            Voir la fiche complète
          </Link>
        </footer>
      )}
    </article>
  );
};

export default StudentCard;
