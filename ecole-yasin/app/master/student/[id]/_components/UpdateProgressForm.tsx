"use client";

import { useFormState, useFormStatus } from "react-dom";
import { updateProgressAction } from "../actions";
import type { ProgressStatus } from "@/types";

const initialState = {
  success: false,
  message: "",
};

const statusOptions: { value: ProgressStatus; label: string }[] = [
  { value: "pending", label: "À réviser" },
  { value: "in-progress", label: "En cours" },
  { value: "revised", label: "Révisé" },
];

interface UpdateProgressFormProps {
  studentId: string;
  surahs: string[];
}

/**
 * Formulaire client permettant au master de mettre à jour la progression d'un élève.
 */
const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Mise à jour..." : "Enregistrer"}
    </button>
  );
};

const UpdateProgressForm = ({ studentId, surahs }: UpdateProgressFormProps) => {
  const [state, formAction] = useFormState(updateProgressAction, initialState);

  return (
    <form action={formAction} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <input type="hidden" name="studentId" value={studentId} />
      <h3 className="text-lg font-semibold text-slate-800">Mettre à jour une progression</h3>
      <div className="space-y-2">
        <label htmlFor="surah" className="text-sm font-medium text-slate-700">
          Sourate
        </label>
        <select
          id="surah"
          name="surah"
          required
          className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="" disabled>
            Sélectionner une sourate
          </option>
          {surahs.map((surah) => (
            <option key={surah} value={surah}>
              {surah}
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
          name="status"
          required
          className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="" disabled>
            Choisir un statut
          </option>
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <label htmlFor="note" className="text-sm font-medium text-slate-700">
          Note interne (visible par le master)
        </label>
        <textarea
          id="note"
          name="note"
          rows={3}
          placeholder="Exemple : bien prononcer les lettres emphatiques."
          className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="feedback" className="text-sm font-medium text-slate-700">
          Commentaire visible pour l’élève
        </label>
        <textarea
          id="feedback"
          name="feedback"
          rows={3}
          placeholder="Exemple : Révision validée, attention au tajwid."
          className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <SubmitButton />
      {state.message && (
        <p className={`text-sm ${state.success ? "text-emerald-600" : "text-red-500"}`}>{state.message}</p>
      )}
    </form>
  );
};

export default UpdateProgressForm;
