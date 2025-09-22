import Link from "next/link";
import type { Student } from "@/types";
import ProgressItem from "@/components/ProgressItem";
import FeedbackCard from "@/components/FeedbackCard";

interface StudentCardProps {
  student: Student;
  href?: string;
}

const StudentCard = ({ student, href }: StudentCardProps) => {
  return (
    <article className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <header className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-primary-dark">{student.name}</h3>
        <p className="text-sm text-slate-500">{student.email}</p>
        <p className="text-xs text-slate-400">Inscrit le {new Date(student.enrolledAt).toLocaleDateString("fr-FR")}</p>
      </header>

      <section className="space-y-3">
        <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Progrès récents</h4>
        <div className="grid gap-2">
          {student.progress.slice(0, 2).map((progress) => (
            <ProgressItem key={progress.id} progress={progress} compact />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Derniers retours</h4>
        <div className="grid gap-2">
          {student.feedback.slice(0, 1).map((feedback) => (
            <FeedbackCard key={feedback.id} feedback={feedback} />
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
