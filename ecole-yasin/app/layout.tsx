import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "École Ya-Sin",
  description: "Suivi islamique personnalisé de la mémorisation du Coran pour masters et élèves."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="flex min-h-screen flex-col bg-slate-50">
        <Header />
        <main className="flex-1 py-10">
          <div className="container">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
