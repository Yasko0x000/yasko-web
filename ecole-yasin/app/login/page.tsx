import Link from "next/link";

export default function LoginPage() {
  return (
    <section className="mx-auto max-w-lg space-y-8">
      <div className="space-y-3 text-center">
        <h1 className="text-3xl font-bold text-primary-dark">Connexion</h1>
        <p className="text-sm text-slate-600">
          Accédez à votre espace École Ya-Sin. Les élèves doivent obtenir leurs identifiants auprès de leur master.
        </p>
      </div>

      <form className="space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-slate-700">
            Adresse email
          </label>
          <input
            id="email"
            type="email"
            placeholder="nom@exemple.com"
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-slate-700">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark"
        >
          Se connecter
        </button>
        <p className="text-center text-xs text-slate-500">
          Besoin d’un compte élève ? Contactez votre master pour recevoir vos identifiants.
        </p>
        <div className="text-center text-xs text-slate-500">
          <Link href="/" className="font-semibold text-primary">
            ← Retour à l’accueil
          </Link>
        </div>
      </form>
    </section>
  );
}
