import type { ProgressEntry } from "@/types";

interface ProgressItemProps {
  progress: ProgressEntry;
  compact?: boolean;
}

const statusStyles: Record<ProgressEntry["status"], string> = {
  revised: "bg-emerald-100 text-emerald-700",
  "in-progress": "bg-amber-100 text-amber-700",
  pending: "bg-slate-100 text-slate-600"
};

const ProgressItem = ({ progress, compact = false }: ProgressItemProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
      <div>
        <p className="font-medium text-slate-700">{progress.surah}</p>
        <p className="text-xs text-slate-500">Versets {progress.ayahs}</p>
      </div>
      <div className="flex flex-col items-end gap-1 text-right">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[progress.status]}`}>
          {progress.status === "revised" && "Révisé"}
          {progress.status === "in-progress" && "En cours"}
          {progress.status === "pending" && "À réviser"}
        </span>
        {!compact && (
          <span className="text-xs text-slate-400">
            Dernière révision : {new Date(progress.lastReviewedAt).toLocaleDateString("fr-FR")}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProgressItem;
