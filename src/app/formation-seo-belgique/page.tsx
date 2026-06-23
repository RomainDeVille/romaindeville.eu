import type { Metadata } from "next";
import { ExpertisePage } from "@/lib/expertise-template";
import { getExpertise } from "@/lib/expertises";
import { altExpertise } from "@/lib/i18n";

const e = getExpertise("formation-seo-belgique")!;

export const metadata: Metadata = {
  title: e.title,
  description: e.description,
  alternates: altExpertise("formation-seo-belgique"),
};

export default function Page() {
  return <ExpertisePage e={e} />;
}
