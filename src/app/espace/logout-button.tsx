"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/v1/auth", { method: "DELETE" });
    router.push("/");
  }

  return (
    <button
      onClick={handleLogout}
      style={{
        background: "none",
        border: "1px solid var(--line)",
        borderRadius: 8,
        padding: "6px 14px",
        fontSize: 13,
        color: "var(--muted)",
        cursor: "pointer",
        fontFamily: "var(--sans)",
        transition: "color 0.2s, border-color 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--danger)";
        e.currentTarget.style.borderColor = "var(--danger)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--muted)";
        e.currentTarget.style.borderColor = "var(--line)";
      }}
    >
      Déconnexion
    </button>
  );
}
