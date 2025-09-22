import StudentCard from "@/components/StudentCard";
import { students, masterProfile } from "@/lib/mockData";

export default function MasterDashboardPage() {
  return (
    <section className="space-y-12">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-primary-dark">Tableau de bord master</h1>
        <p className="text-sm text-slate-600">
          {masterProfile.name}, voici un aperçu de vos élèves et un formulaire pour en ajouter de nouveaux.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {students.map((student) => (
          <StudentCard key={student.id} student={student} href={`/master/student/${student.id}`} />
        ))}
      </div>

      <section id="ajouter-eleve" className="rounded-3xl border border-dashed border-primary/40 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-primary-dark">Inscrire un nouvel élève</h2>
        <p className="mt-2 text-sm text-slate-600">
          Remplissez les informations de base pour créer un compte élève. Les identifiants pourront ensuite être partagés directement.
        </p>
        <form className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="student-name" className="text-sm font-medium text-slate-700">
              Nom complet
            </label>
            <input
              id="student-name"
              type="text"
              placeholder="Nom de l’élève"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="student-email" className="text-sm font-medium text-slate-700">
              Adresse email
            </label>
            <input
              id="student-email"
              type="email"
              placeholder="eleve@exemple.com"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="student-password" className="text-sm font-medium text-slate-700">
              Mot de passe provisoire
            </label>
            <input
              id="student-password"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="notes" className="text-sm font-medium text-slate-700">
              Notes internes (facultatif)
            </label>
            <textarea
              id="notes"
              rows={3}
              placeholder="Préciser le niveau, les objectifs..."
              className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark"
            >
              Créer l’élève
            </button>
          </div>
        </form>
      </section>
    </section>
  );
}
