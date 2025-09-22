export type UserRole = "master" | "student";

export interface ProgressEntry {
  id: string;
  surah: string;
  ayahs: string;
  status: "revised" | "in-progress" | "pending";
  lastReviewedAt: string;
}

export interface Feedback {
  id: string;
  authorRole: UserRole;
  content: string;
  createdAt: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  enrolledAt: string;
  progress: ProgressEntry[];
  feedback: Feedback[];
}
