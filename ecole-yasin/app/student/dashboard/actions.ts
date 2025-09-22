"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import { getCurrentSession } from "@/lib/auth";
import ProgressModel from "@/lib/models/Progress";
import type { ProgressStatus } from "@/types";

interface UpdateResult {
  success: boolean;
  message: string;
}

/**
 * Permet à l'élève de changer le statut d'une sourate.
 */
const allowedStatuses: ProgressStatus[] = ["pending", "in-progress", "revised"];

export async function updateStudentProgress(_: UpdateResult | undefined, formData: FormData): Promise<UpdateResult> {
  const session = await getCurrentSession();

  if (!session || session.user.role !== "student") {
    return { success: false, message: "Action non autorisée." };
  }

  const surah = formData.get("surah")?.toString();
  const status = formData.get("status")?.toString() as ProgressStatus | undefined;

  if (!surah || !status || !allowedStatuses.includes(status)) {
    return { success: false, message: "Merci de sélectionner une sourate et un statut." };
  }

  await connectDB();

  await ProgressModel.findOneAndUpdate(
    { studentId: session.user.id, surah },
    { $set: { status, date: new Date() } },
    { upsert: true }
  );

  revalidatePath("/student/dashboard");

  return { success: true, message: "Progression mise à jour." };
}
