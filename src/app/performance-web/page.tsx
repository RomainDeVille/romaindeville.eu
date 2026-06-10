import type { Metadata } from "next";
import { ExpertisePage } from "@/lib/expertise-template";
import { getExpertise } from "@/lib/expertises";

const e = getExpertise("performance-web")!;

export const metadata: Metadata = {
  title: e.title,
  description: e.description,
  alternates: { canonical: "/performance-web" },
};

export default function Page() {
  return <ExpertisePage e={e} />;
}
