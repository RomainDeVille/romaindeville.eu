import type { Metadata } from "next";
import { ExpertisePage } from "@/lib/expertise-template";
import { getExpertise } from "@/lib/expertises";
import { altExpertise } from "@/lib/i18n";

const e = getExpertise("google-ads-bruxelles")!;

export const metadata: Metadata = {
  title: e.title,
  description: e.description,
  alternates: altExpertise("google-ads-bruxelles"),
};

export default function Page() {
  return <ExpertisePage e={e} />;
}
