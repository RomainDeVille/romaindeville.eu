"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { counterpartPath, ui, type Locale } from "@/lib/i18n";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";
  const target: Locale = locale === "fr" ? "en" : "fr";
  const href = counterpartPath(pathname, target);
  return (
    <Link
      className="btn btn-ghost"
      href={href}
      hrefLang={target}
      aria-label={ui[locale].switchLabel}
    >
      {ui[locale].switchTo}
    </Link>
  );
}
