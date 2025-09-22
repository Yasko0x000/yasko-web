"use client";

import { useFormState, useFormStatus } from "react-dom";
import type { ProgressEntry, ProgressStatus } from "@/types";
import { SURAH_LIST } from "@/lib/surahs";
import { updateStudentProgress } from "../actions";

const initialState = {
  success: false,
  message: "",
};

const statusLabels: Record<ProgressStatus, string> = {
  pending: "À réviser",
  "in-progress": "En cours",
  revised: "Révisé",
};

const statusOptions: { value: ProgressStatus; label: string }[] = [
  { value: "pending", label: "À réviser" },
  { value: "in-progress", label: "En cours" },
  { value: "revised", label: "Révisé" },
];

interface ProgressTableProps {
  progress: ProgressEntry[];
}

/**
 * Liste interactive des sourates pour l'élève.
 */
const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Mise à jour..." : "Valider"}
    </button>
  );
};

const ProgressTable = ({ progress }: ProgressTableProps) => {
  const [state, formAction] = useFormState(updateStudentProgress, initialState);

  const progressBySurah = new Map(progress.map((item) => [item.surah, item]));

  return (
    <form action={formAction} className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Sourate</th>
              <th className="px-4 py-3">Statut actuel</th>
              <th className="px-4 py-3">Dernière mise à jour</th>
            </tr>
          </thead>
          <tbody>
            {SURAH_LIST.map((surah) => {
              const entry = progressBySurah.get(surah);
              return (
                <tr key={surah} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium text-slate-700">{surah}</td>
                  <td className="px-4 py-3 text-slate-600">
                    {entry ? statusLabels[entry.status] : "Non commencé"}
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {entry ? new Date(entry.date).toLocaleDateString("fr-FR") : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2 md:col-span-1">
          <label htmlFor="surah" className="text-sm font-medium text-slate-700">
            Choisir une sourate
          </label>
          <select
            id="surah"
            name="surah"
            required
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="" disabled>
              Sélectionner
            </option>
            {SURAH_LIST.map((surah) => (
              <option key={surah} value={surah}>
                {surah}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2 md:col-span-1">
          <label htmlFor="status" className="text-sm font-medium text-slate-700">
            Nouveau statut
          </label>
          <select
            id="status"
            name="status"
            required
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="" disabled>
              Choisir
            </option>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end md:col-span-1">
          <SubmitButton />
        </div>
      </div>

      {state.message && (
        <p className={`text-sm ${state.success ? "text-emerald-600" : "text-red-500"}`}>{state.message}</p>
      )}
    </form>
  );
};

export default ProgressTable;
