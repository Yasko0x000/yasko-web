import ProgressItem from "@/components/ProgressItem";
import FeedbackCard from "@/components/FeedbackCard";
import { students } from "@/lib/mockData";

const currentStudent = students[0];

const reminders = [
  {
    id: "r1",
    title: "Révision du passage Ya-Sin 21-40",
    date: "2024-02-15",
    description: "Préparer la récitation complète pour la prochaine séance."
  },
  {
    id: "r2",
    title: "Mémorisation de Al-Mulk 11-20",
    date: "2024-02-18",
    description: "Mettre l’accent sur la prononciation des lettres emphatiques."
  }
];

export default function StudentDashboardPage() {
  return (
    <section className="space-y-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-primary-dark">Assalamu alaykoum, {currentStudent.name} 👋</h1>
        <p className="text-sm text-slate-600">
          Voici vos progrès récents et les rappels envoyés par votre master. Continuez vos efforts !
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-primary-dark">Mes progrès</h2>
        <div className="grid gap-4">
          {currentStudent.progress.map((progress) => (
            <ProgressItem key={progress.id} progress={progress} />
          ))}
        </div>
      </section>

      <section className="space-y-4" id="rappels">
        <h2 className="text-xl font-semibold text-primary-dark">Rappels & objectifs</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {reminders.map((reminder) => (
            <article key={reminder.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>À faire avant le</span>
                <span>{new Date(reminder.date).toLocaleDateString("fr-FR")}</span>
              </div>
              <h3 className="mt-2 text-lg font-semibold text-slate-800">{reminder.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{reminder.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-primary-dark">Commentaires du master</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {currentStudent.feedback.map((feedback) => (
            <FeedbackCard key={feedback.id} feedback={feedback} />
          ))}
        </div>
      </section>
    </section>
  );
}
