import type { Student } from "@/types";

export const students: Student[] = [
  {
    id: "1",
    name: "Amina El Idrissi",
    email: "amina@example.com",
    enrolledAt: "2023-09-01",
    progress: [
      {
        id: "p1",
        surah: "Ya-Sin",
        ayahs: "1-20",
        status: "revised",
        lastReviewedAt: "2024-02-12"
      },
      {
        id: "p2",
        surah: "Al-Mulk",
        ayahs: "1-10",
        status: "in-progress",
        lastReviewedAt: "2024-02-09"
      }
    ],
    feedback: [
      {
        id: "f1",
        authorRole: "master",
        content: "Très bonne mémorisation, continue sur cette lancée.",
        createdAt: "2024-02-12"
      }
    ]
  },
  {
    id: "2",
    name: "Youssef Benali",
    email: "youssef@example.com",
    enrolledAt: "2024-01-15",
    progress: [
      {
        id: "p3",
        surah: "Ar-Rahman",
        ayahs: "1-30",
        status: "pending",
        lastReviewedAt: "2024-02-10"
      }
    ],
    feedback: [
      {
        id: "f2",
        authorRole: "master",
        content: "Préparer la révision de Ar-Rahman pour la semaine prochaine.",
        createdAt: "2024-02-10"
      }
    ]
  }
];

export const masterProfile = {
  id: "m1",
  name: "Professeur Karim",
  email: "karim@ecoleyasin.com"
};
