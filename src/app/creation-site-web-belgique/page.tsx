import type { Metadata } from "next";
import { ExpertisePage } from "@/lib/expertise-template";
import { getExpertise } from "@/lib/expertises";

const e = getExpertise("creation-site-web-belgique")!;

export const metadata: Metadata = {
  title: e.title,
  description: e.description,
  alternates: { canonical: "/creation-site-web-belgique" },
};

export default function Page() {
  return <ExpertisePage e={e} />;
}
