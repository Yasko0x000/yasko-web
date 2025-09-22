export type UserRole = "master" | "student";

export type ProgressStatus = "pending" | "in-progress" | "revised";

export interface ProgressEntry {
  id: string;
  surah: string;
  status: ProgressStatus;
  date: string;
  note?: string;
  feedbackMaster?: string;
}

export interface DashboardStudent {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  progress: ProgressEntry[];
}
