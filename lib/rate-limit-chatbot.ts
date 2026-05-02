import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 20;

function clientKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

const memoryBuckets = new Map<string, { count: number; resetAt: number }>();

let upstashLimiter: Ratelimit | null = null;

function getUpstashLimiter(): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  if (!upstashLimiter) {
    upstashLimiter = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(MAX_PER_WINDOW, "1 m"),
      prefix: "portfolio:chatbot",
    });
  }
  return upstashLimiter;
}

/**
 * Limite les requêtes POST /api/chatbot par IP (ou clé anonyme).
 * Si UPSTASH_REDIS_REST_URL et UPSTASH_REDIS_REST_TOKEN sont définis, utilise Upstash (recommandé en prod serverless).
 * Sinon, fenêtre glissante en mémoire par instance (protection partielle).
 */
export async function chatbotRateLimit(
  req: Request
): Promise<{ ok: true } | { ok: false; response: NextResponse }> {
  const key = clientKey(req);

  const upstash = getUpstashLimiter();
  if (upstash) {
    const { success, reset } = await upstash.limit(key);
    if (!success) {
      const retryAfter = Math.max(1, Math.ceil((reset - Date.now()) / 1000));
      return {
        ok: false,
        response: NextResponse.json(
          { error: "Trop de requêtes. Réessayez plus tard." },
          {
            status: 429,
            headers: { "Retry-After": String(retryAfter) },
          }
        ),
      };
    }
    return { ok: true };
  }

  const now = Date.now();
  let bucket = memoryBuckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    bucket = { count: 1, resetAt: now + WINDOW_MS };
    memoryBuckets.set(key, bucket);
    return { ok: true };
  }
  if (bucket.count >= MAX_PER_WINDOW) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Trop de requêtes. Réessayez plus tard." },
        { status: 429 }
      ),
    };
  }
  bucket.count += 1;
  return { ok: true };
}
