import type { Metadata } from "next";
import { ExpertisePage } from "@/lib/expertise-template";
import { getExpertise } from "@/lib/expertises";

const e = getExpertise("suivi-seo-mensuel")!;

export const metadata: Metadata = {
  title: e.title,
  description: e.description,
  alternates: { canonical: "/suivi-seo-mensuel" },
};

export default function Page() {
  return <ExpertisePage e={e} />;
}
