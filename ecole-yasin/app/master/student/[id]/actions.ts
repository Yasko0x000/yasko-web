"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import { getCurrentSession } from "@/lib/auth";
import ProgressModel from "@/lib/models/Progress";
import UserModel from "@/lib/models/User";
import type { ProgressStatus } from "@/types";

interface UpdateResult {
  success: boolean;
  message: string;
}

/**
 * Met à jour ou crée un suivi de progression pour un élève.
 */
const allowedStatuses: ProgressStatus[] = ["pending", "in-progress", "revised"];

export async function updateProgressAction(_: UpdateResult | undefined, formData: FormData): Promise<UpdateResult> {
  const session = await getCurrentSession();

  if (!session || session.user.role !== "master") {
    return { success: false, message: "Action non autorisée." };
  }

  const studentId = formData.get("studentId")?.toString();
  const surah = formData.get("surah")?.toString();
  const status = formData.get("status")?.toString() as ProgressStatus | undefined;
  const feedback = formData.get("feedback")?.toString().trim();
  const note = formData.get("note")?.toString().trim();

  if (!studentId || !surah || !status || !allowedStatuses.includes(status)) {
    return { success: false, message: "Merci de sélectionner une sourate et un statut." };
  }

  await connectDB();

  const student = await UserModel.findOne({ _id: studentId, masterId: session.user.id }).lean();

  if (!student) {
    return { success: false, message: "Impossible de trouver cet élève." };
  }

  await ProgressModel.findOneAndUpdate(
    { studentId, surah },
    {
      $set: {
        status,
        feedbackMaster: feedback || undefined,
        note: note || undefined,
        date: new Date(),
      },
    },
    { upsert: true }
  );

  revalidatePath(`/master/student/${studentId}`);

  return { success: true, message: "Progression mise à jour avec succès." };
}
