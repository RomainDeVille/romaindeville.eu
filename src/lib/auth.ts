const encoder = new TextEncoder();

async function getKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function signToken(user: string, secret: string): Promise<string> {
  const timestamp = Date.now().toString();
  const key = await getKey(secret);
  const data = encoder.encode(`${user}:${timestamp}`);
  const sig = await crypto.subtle.sign("HMAC", key, data);
  const hash = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `${user}|${timestamp}|${hash}`;
}

export async function verifyToken(
  token: string,
  secret: string
): Promise<{ valid: boolean; user?: string }> {
  const parts = token.split("|");
  if (parts.length !== 3) return { valid: false };

  const [user, timestamp, hash] = parts;

  // Expiration 30 jours
  const ts = parseInt(timestamp, 10);
  if (isNaN(ts) || Date.now() - ts > 30 * 24 * 60 * 60 * 1000) {
    return { valid: false };
  }

  const key = await getKey(secret);
  const data = encoder.encode(`${user}:${timestamp}`);
  const sig = await crypto.subtle.sign("HMAC", key, data);
  const expected = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  if (hash !== expected) return { valid: false };

  return { valid: true, user };
}
