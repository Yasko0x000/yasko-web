import Link from "next/link";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <section className="mx-auto max-w-lg space-y-8">
      <div className="space-y-3 text-center">
        <h1 className="text-3xl font-bold text-primary-dark">Connexion</h1>
        <p className="text-sm text-slate-600">
          Accédez à votre espace École Ya-Sin. Les élèves doivent obtenir leurs identifiants auprès de leur master.
        </p>
      </div>

      <LoginForm />
      <div className="text-center text-xs text-slate-500">
        <Link href="/" className="font-semibold text-primary">
          ← Retour à l’accueil
        </Link>
      </div>
    </section>
  );
}
