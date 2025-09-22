"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createStudentAction, type ActionResult } from "../actions";

const initialState: ActionResult = {
  success: false,
  message: "",
};

/**
 * Bouton de soumission affichant l'état de chargement.
 */
const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Création en cours..." : "Créer l’élève"}
    </button>
  );
};

/**
 * Formulaire client relié à l'action serveur pour ajouter un élève.
 */
const AddStudentForm = () => {
  const [state, formAction] = useFormState(createStudentAction, initialState);

  return (
    <form action={formAction} className="mt-6 grid gap-6 md:grid-cols-2">
      <div className="space-y-2">
        <label htmlFor="student-name" className="text-sm font-medium text-slate-700">
          Nom complet
        </label>
        <input
          id="student-name"
          name="name"
          type="text"
          placeholder="Nom de l’élève"
          required
          className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="student-email" className="text-sm font-medium text-slate-700">
          Adresse email
        </label>
        <input
          id="student-email"
          name="email"
          type="email"
          placeholder="eleve@exemple.com"
          required
          className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div className="space-y-2 md:col-span-2">
        <label htmlFor="student-password" className="text-sm font-medium text-slate-700">
          Mot de passe provisoire
        </label>
        <input
          id="student-password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div className="md:col-span-2">
        <SubmitButton />
      </div>
      {state.message && (
        <p className={`md:col-span-2 text-sm ${state.success ? "text-emerald-600" : "text-red-500"}`}>
          {state.message}
        </p>
      )}
    </form>
  );
};

export default AddStudentForm;
