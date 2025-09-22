import { redirect } from "next/navigation";
import ProgressTable from "./_components/ProgressTable";
import ProgressItem from "@/components/ProgressItem";
import { getCurrentSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import ProgressModel from "@/lib/models/Progress";
import type { ProgressEntry } from "@/types";

/**
 * Charge les progressions stockées pour l'élève courant.
 */
async function loadProgress(studentId: string): Promise<ProgressEntry[]> {
  await connectDB();

  const progresses = await ProgressModel.find({ studentId })
    .sort({ date: -1 })
    .lean();

  return progresses.map((progress) => ({
    id: progress._id.toString(),
    surah: progress.surah,
    status: progress.status,
    date: progress.date.toISOString(),
    note: progress.note ?? undefined,
    feedbackMaster: progress.feedbackMaster ?? undefined,
  }));
}

export default async function StudentDashboardPage() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "student") {
    redirect("/master/dashboard");
  }

  const progress = await loadProgress(session.user.id);
  const feedbacks = progress.filter((item) => Boolean(item.feedbackMaster));

  return (
    <section className="space-y-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-primary-dark">
          Assalamu alaykoum, {session.user.name ?? "cher élève"} 👋
        </h1>
        <p className="text-sm text-slate-600">
          Voici vos progrès récents. Mettez à jour vos révisions et suivez les retours de votre master.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-primary-dark">Mes sourates</h2>
        <ProgressTable progress={progress} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-primary-dark">Derniers retours du master</h2>
        <div className="grid gap-4">
          {feedbacks.length === 0 && (
            <p className="text-sm text-slate-500">Aucun commentaire disponible pour le moment.</p>
          )}
          {feedbacks.map((item) => (
            <ProgressItem key={item.id} progress={item} />
          ))}
        </div>
      </section>
    </section>
  );
}
