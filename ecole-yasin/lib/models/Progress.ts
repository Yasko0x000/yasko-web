import mongoose, { Schema } from "mongoose";
import type { ProgressStatus } from "@/types";

/**
 * Interface décrivant un suivi de progression d'un élève sur une sourate.
 */
export interface IProgressDocument {
  studentId: Schema.Types.ObjectId;
  surah: string;
  status: ProgressStatus;
  date: Date;
  note?: string;
  feedbackMaster?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProgressSchema = new Schema<IProgressDocument>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    surah: { type: String, required: true },
    status: { type: String, enum: ["pending", "in-progress", "revised"], default: "pending" },
    date: { type: Date, default: Date.now },
    note: { type: String },
    feedbackMaster: { type: String },
  },
  { timestamps: true }
);

ProgressSchema.index({ studentId: 1, surah: 1 }, { unique: true });

/**
 * Réutilise le modèle existant lors des rechargements à chaud.
 */
const ProgressModel =
  mongoose.models.Progress ?? mongoose.model<IProgressDocument>("Progress", ProgressSchema);

export default ProgressModel;
