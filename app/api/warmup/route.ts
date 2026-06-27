export const runtime = "nodejs";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8001";

export async function GET() {
  try {
    await fetch(`${API_URL}/health`, { cache: "no-store" });
  } catch {
    // Silently ignore — warmup failure must never surface to users.
  }
  return new Response(null, { status: 204 });
}
