import type { Metadata } from "next";
import { ExpertisePage } from "@/lib/expertise-template";
import { getExpertise } from "@/lib/expertises";

const e = getExpertise("google-ads-secteurs-belgique")!;

export const metadata: Metadata = {
  title: e.title,
  description: e.description,
  alternates: { canonical: "/google-ads-secteurs-belgique" },
};

export default function Page() {
  return <ExpertisePage e={e} />;
}
