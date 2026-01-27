export const runtime = 'nodejs';
import { NextResponse } from 'next/server';

export async function GET() {
  const key = process.env.OPENAI_API_KEY;
  const present = Boolean(key);
  const len = key ? key.length : 0;

  // Attempt a minimal call to OpenAI to surface the exact error (if any).
  // Do NOT return the key itself.
  if (!present) {
    return NextResponse.json({ ok: false, present: false, len });
  }

  try {
    const resp = await fetch('https://api.openai.com/v1/models', {
      headers: { Authorization: `Bearer ${key}` },
    });

    const body = await resp.text();
    let parsed: any = body;
    try { parsed = JSON.parse(body); } catch (_) {}

    return NextResponse.json({ ok: resp.ok, status: resp.status, present: true, len, body: parsed });
  } catch (err) {
    return NextResponse.json({ ok: false, present: true, len, error: String(err) }, { status: 500 });
  }
}
