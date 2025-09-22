import mongoose, { Schema } from "mongoose";
import type { UserRole } from "@/types";

/**
 * Interface décrivant un utilisateur stocké dans MongoDB.
 */
export interface IUserDocument {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  masterId?: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["master", "student"], required: true },
    masterId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

/**
 * Réutilise le modèle si il existe déjà pour éviter les erreurs lors des hot reloads.
 */
const UserModel = mongoose.models.User ?? mongoose.model<IUserDocument>("User", UserSchema);

export default UserModel;
