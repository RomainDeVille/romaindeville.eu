import type { Metadata } from "next";
import { ExpertisePage } from "@/lib/expertise-template";
import { getExpertise } from "@/lib/expertises";

const e = getExpertise("formation-seo-belgique")!;

export const metadata: Metadata = {
  title: e.title,
  description: e.description,
  alternates: { canonical: "/formation-seo-belgique" },
};

export default function Page() {
  return <ExpertisePage e={e} />;
}
