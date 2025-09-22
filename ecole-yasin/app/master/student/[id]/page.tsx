import { notFound, redirect } from "next/navigation";
import ProgressItem from "@/components/ProgressItem";
import { getCurrentSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import UserModel from "@/lib/models/User";
import ProgressModel from "@/lib/models/Progress";
import UpdateProgressForm from "./_components/UpdateProgressForm";
import { SURAH_LIST } from "@/lib/surahs";
import type { ProgressEntry } from "@/types";

interface StudentDetailPageProps {
  params: { id: string };
}

/**
 * Récupère les informations détaillées d'un élève et sa progression.
 */
async function loadStudent(masterId: string, studentId: string) {
  await connectDB();

  const student = await UserModel.findOne({ _id: studentId, masterId }).lean();

  if (!student) {
    return null;
  }

  const progresses = await ProgressModel.find({ studentId })
    .sort({ date: -1 })
    .lean();

  const entries: ProgressEntry[] = progresses.map((progress) => ({
    id: progress._id.toString(),
    surah: progress.surah,
    status: progress.status,
    date: progress.date.toISOString(),
    note: progress.note ?? undefined,
    feedbackMaster: progress.feedbackMaster ?? undefined,
  }));

  return {
    id: student._id.toString(),
    name: student.name,
    email: student.email,
    createdAt: student.createdAt.toISOString(),
    progress: entries,
  };
}

export default async function StudentDetailPage({ params }: StudentDetailPageProps) {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "master") {
    redirect("/student/dashboard");
  }

  const student = await loadStudent(session.user.id, params.id);

  if (!student) {
    notFound();
  }

  const feedbackHistory = student.progress.filter((item) => Boolean(item.feedbackMaster));

  return (
    <section className="space-y-12">
      <header className="space-y-3">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary-dark">{student.name}</h1>
            <p className="text-sm text-slate-600">{student.email}</p>
          </div>
          <span className="rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary-dark">
            Élève inscrit le {new Date(student.createdAt).toLocaleDateString("fr-FR")}
          </span>
        </div>
        <p className="text-sm text-slate-600">
          Consultez les progrès détaillés, ajoutez des commentaires et validez les révisions directement depuis cette page.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-primary-dark">Progrès détaillés</h2>
        <div className="grid gap-4">
          {student.progress.length === 0 && (
            <p className="text-sm text-slate-500">Aucune progression enregistrée pour le moment.</p>
          )}
          {student.progress.map((progress) => (
            <ProgressItem key={progress.id} progress={progress} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-primary-dark">Actions du master</h2>
        <UpdateProgressForm studentId={student.id} surahs={SURAH_LIST} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-primary-dark">Historique des commentaires</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {feedbackHistory.length === 0 && (
            <p className="text-sm text-slate-500">Aucun commentaire enregistré pour le moment.</p>
          )}
          {feedbackHistory.map((item) => (
            <article
              key={item.id}
              className="rounded-lg border border-slate-200 bg-white p-4 text-sm shadow-sm"
            >
              <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
                <span>Sourate {item.surah}</span>
                <span>{new Date(item.date).toLocaleDateString("fr-FR")}</span>
              </div>
              <p className="text-slate-600">{item.feedbackMaster}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
