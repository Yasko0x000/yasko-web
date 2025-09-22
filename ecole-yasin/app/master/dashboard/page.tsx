import { redirect } from "next/navigation";
import StudentCard from "@/components/StudentCard";
import AddStudentForm from "./_components/AddStudentForm";
import { getCurrentSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import UserModel from "@/lib/models/User";
import ProgressModel from "@/lib/models/Progress";
import type { DashboardStudent, ProgressEntry } from "@/types";

/**
 * Charge les élèves du master et leurs progressions récentes.
 */
async function loadStudents(masterId: string): Promise<DashboardStudent[]> {
  await connectDB();

  const students = await UserModel.find({ role: "student", masterId })
    .sort({ createdAt: -1 })
    .lean();

  const studentIds = students.map((student) => student._id);

  const progresses = await ProgressModel.find({ studentId: { $in: studentIds } })
    .sort({ date: -1 })
    .lean();

  const progressByStudent = new Map<string, ProgressEntry[]>();

  progresses.forEach((progress) => {
    const entry: ProgressEntry = {
      id: progress._id.toString(),
      surah: progress.surah,
      status: progress.status,
      date: progress.date.toISOString(),
      note: progress.note ?? undefined,
      feedbackMaster: progress.feedbackMaster ?? undefined,
    };

    const key = progress.studentId.toString();
    const list = progressByStudent.get(key) ?? [];
    list.push(entry);
    progressByStudent.set(key, list);
  });

  return students.map((student) => ({
    id: student._id.toString(),
    name: student.name,
    email: student.email,
    createdAt: student.createdAt.toISOString(),
    progress: progressByStudent.get(student._id.toString()) ?? [],
  }));
}

export default async function MasterDashboardPage() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "master") {
    redirect("/student/dashboard");
  }

  const students = await loadStudents(session.user.id);

  return (
    <section className="space-y-12">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-primary-dark">Tableau de bord master</h1>
        <p className="text-sm text-slate-600">
          Gérez vos élèves, consultez leurs progrès et créez de nouveaux comptes en quelques secondes.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {students.length === 0 && (
          <p className="text-sm text-slate-500">
            Aucun élève pour le moment. Utilisez le formulaire ci-dessous pour inscrire votre premier élève.
          </p>
        )}
        {students.map((student) => (
          <StudentCard key={student.id} student={student} href={`/master/student/${student.id}`} />
        ))}
      </div>

      <section id="ajouter-eleve" className="rounded-3xl border border-dashed border-primary/40 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-primary-dark">Inscrire un nouvel élève</h2>
        <p className="mt-2 text-sm text-slate-600">
          Remplissez les informations de base pour créer un compte élève. Les identifiants pourront ensuite être partagés directement.
        </p>
        <AddStudentForm />
      </section>
    </section>
  );
}
