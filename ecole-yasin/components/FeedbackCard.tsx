import type { Feedback } from "@/types";

interface FeedbackCardProps {
  feedback: Feedback;
}

const roleLabel: Record<Feedback["authorRole"], string> = {
  master: "Master",
  student: "Élève"
};

const FeedbackCard = ({ feedback }: FeedbackCardProps) => {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 text-sm shadow-sm">
      <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
        <span>{roleLabel[feedback.authorRole]}</span>
        <span>{new Date(feedback.createdAt).toLocaleDateString("fr-FR")}</span>
      </div>
      <p className="text-slate-600">{feedback.content}</p>
    </div>
  );
};

export default FeedbackCard;
