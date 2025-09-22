"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import UserModel from "@/lib/models/User";
import { getCurrentSession, hashPassword } from "@/lib/auth";

export interface ActionResult {
  success: boolean;
  message: string;
}

/**
 * Crée un compte élève rattaché au master connecté.
 */
export async function createStudentAction(_: ActionResult | undefined, formData: FormData): Promise<ActionResult> {
  const session = await getCurrentSession();

  if (!session || session.user.role !== "master") {
    return { success: false, message: "Action non autorisée." };
  }

  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().toLowerCase().trim();
  const password = formData.get("password")?.toString();

  if (!name || !email || !password) {
    return { success: false, message: "Tous les champs sont obligatoires." };
  }

  await connectDB();

  const existingUser = await UserModel.findOne({ email }).lean();

  if (existingUser) {
    return { success: false, message: "Un utilisateur existe déjà avec cet email." };
  }

  const hashedPassword = await hashPassword(password);

  await UserModel.create({
    name,
    email,
    password: hashedPassword,
    role: "student",
    masterId: session.user.id,
  });

  revalidatePath("/master/dashboard");

  return { success: true, message: "Élève créé avec succès." };
}
