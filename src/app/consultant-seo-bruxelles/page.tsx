import type { Metadata } from "next";
import { ExpertisePage } from "@/lib/expertise-template";
import { getExpertise } from "@/lib/expertises";

const e = getExpertise("consultant-seo-bruxelles")!;

export const metadata: Metadata = {
  title: e.title,
  description: e.description,
  alternates: { canonical: "/consultant-seo-bruxelles" },
};

export default function Page() {
  return <ExpertisePage e={e} />;
}
