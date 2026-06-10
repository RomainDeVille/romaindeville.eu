import type { Metadata } from "next";
import { ExpertisePage } from "@/lib/expertise-template";
import { getExpertise } from "@/lib/expertises";

const e = getExpertise("strategie-contenu-b2b")!;

export const metadata: Metadata = {
  title: e.title,
  description: e.description,
  alternates: { canonical: "/strategie-contenu-b2b" },
};

export default function Page() {
  return <ExpertisePage e={e} />;
}
