import ProgressItem from "@/components/ProgressItem";
import FeedbackCard from "@/components/FeedbackCard";
import { students } from "@/lib/mockData";

interface StudentDetailPageProps {
  params: { id: string };
}

export default function StudentDetailPage({ params }: StudentDetailPageProps) {
  const student = students.find((item) => item.id === params.id) ?? students[0];

  return (
    <section className="space-y-12">
      <header className="space-y-3">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary-dark">{student.name}</h1>
            <p className="text-sm text-slate-600">{student.email}</p>
          </div>
          <span className="rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary-dark">
            Élève inscrit le {new Date(student.enrolledAt).toLocaleDateString("fr-FR")}
          </span>
        </div>
        <p className="text-sm text-slate-600">
          Consultez les progrès détaillés, ajoutez des commentaires et validez les révisions directement depuis cette page.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-primary-dark">Progrès détaillés</h2>
        <div className="grid gap-4">
          {student.progress.map((progress) => (
            <ProgressItem key={progress.id} progress={progress} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-primary-dark">Actions du master</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <form className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800">Ajouter un commentaire</h3>
            <div className="space-y-2">
              <label htmlFor="feedback" className="text-sm font-medium text-slate-700">
                Commentaire
              </label>
              <textarea
                id="feedback"
                rows={4}
                placeholder="Exemple : Révision validée, attention au tajwid sur les versets 15-20"
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark"
            >
              Enregistrer le commentaire
            </button>
          </form>

          <form className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800">Valider une révision</h3>
            <div className="space-y-2">
              <label htmlFor="surah" className="text-sm font-medium text-slate-700">
                Sourate
              </label>
              <select
                id="surah"
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {student.progress.map((progress) => (
                  <option key={progress.id} value={progress.id}>
                    {progress.surah} — versets {progress.ayahs}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium text-slate-700">
                Statut
              </label>
              <select
                id="status"
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="revised">Révisé</option>
                <option value="in-progress">En cours</option>
                <option value="pending">À revoir</option>
              </select>
            </div>
            <button
              type="submit"
              className="inline-flex items-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark"
            >
              Mettre à jour la progression
            </button>
          </form>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-primary-dark">Historique des commentaires</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {student.feedback.map((feedback) => (
            <FeedbackCard key={feedback.id} feedback={feedback} />
          ))}
        </div>
      </section>
    </section>
  );
}
