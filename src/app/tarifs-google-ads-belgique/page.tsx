import type { Metadata } from "next";
import { ExpertisePage } from "@/lib/expertise-template";
import { getExpertise } from "@/lib/expertises";

const e = getExpertise("tarifs-google-ads-belgique")!;

export const metadata: Metadata = {
  title: e.title,
  description: e.description,
  alternates: { canonical: "/tarifs-google-ads-belgique" },
};

export default function Page() {
  return <ExpertisePage e={e} />;
}
