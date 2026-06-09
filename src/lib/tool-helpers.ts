import { NextResponse } from "next/server";
import type { ToolId, ToolResult } from "./tools";

export function normalizeUrl(raw: unknown): URL | null {
  if (!raw || typeof raw !== "string") return null;
  try {
    return new URL(raw.startsWith("http") ? raw : `https://${raw}`);
  } catch {
    return null;
  }
}

/* Toujours 200 avec status interne : un tool en echec ne casse pas l'orchestration */
export async function runTool(
  tool: ToolId,
  fn: () => Promise<{ data: unknown; empty?: boolean }>
): Promise<NextResponse> {
  const t0 = Date.now();
  try {
    const { data, empty } = await fn();
    const result: ToolResult = {
      tool,
      status: empty ? "empty" : "ok",
      durationMs: Date.now() - t0,
      data,
    };
    return NextResponse.json(result);
  } catch (err) {
    const result: ToolResult = {
      tool,
      status: "error",
      durationMs: Date.now() - t0,
      data: null,
      error: err instanceof Error ? err.message : "Erreur inconnue",
    };
    return NextResponse.json(result);
  }
}

export async function fetchWithTimeout(url: string, init: RequestInit = {}, timeoutMs = 8000): Promise<Response> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal, cache: "no-store" });
  } finally {
    clearTimeout(t);
  }
}

const DOH = "https://cloudflare-dns.com/dns-query";

export async function dnsQuery(name: string, type: string): Promise<string[]> {
  const res = await fetchWithTimeout(`${DOH}?name=${encodeURIComponent(name)}&type=${type}`, {
    headers: { Accept: "application/dns-json" },
  }, 6000);
  if (!res.ok) return [];
  const data = (await res.json()) as { Answer?: { data: string }[] };
  return (data.Answer || []).map((a) => a.data.replace(/^"|"$/g, "").replace(/" "/g, ""));
}
