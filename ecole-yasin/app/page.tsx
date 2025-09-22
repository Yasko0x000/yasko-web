import Link from "next/link";

export default function HomePage() {
  return (
    <section className="space-y-16">
      <div className="grid gap-10 lg:grid-cols-[2fr,1fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary-dark">
            Bienvenue à l’École Ya-Sin
          </span>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            Un accompagnement sur-mesure pour la mémorisation du Coran.
          </h1>
          <p className="text-lg text-slate-600">
            La plateforme École Ya-Sin permet aux masters de suivre leurs élèves, d’encourager la
            révision des sourates et de conserver l’historique des progrès.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/login"
              className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-primary-dark"
            >
              Se connecter
            </Link>
            <Link href="#fonctionnalites" className="text-base font-semibold text-primary">
              Découvrir les fonctionnalités →
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-primary/20 bg-white p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-primary-dark">Fonctionnalités clés</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li className="rounded-lg bg-primary/5 p-3">
              ✔️ Gestion centralisée des élèves par le master
            </li>
            <li className="rounded-lg bg-primary/5 p-3">
              ✔️ Visualisation claire des progrès de mémorisation
            </li>
            <li className="rounded-lg bg-primary/5 p-3">
              ✔️ Commentaires et validations de révisions
            </li>
          </ul>
        </div>
      </div>

      <div id="fonctionnalites" className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Suivi quotidien",
            description:
              "Visualisez en un coup d’œil les sourates travaillées et planifiez les prochaines révisions."
          },
          {
            title: "Communication facilitée",
            description: "Ajoutez des commentaires et des rappels pour encourager chaque élève."
          },
          {
            title: "Organisation structurée",
            description:
              "Préparez l’intégration avec MongoDB grâce à une architecture pensée pour évoluer."
          }
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-primary-dark">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
