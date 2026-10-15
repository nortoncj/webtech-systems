import { NextResponse } from "next/server";

// TEMPORARY DIAGNOSTIC — delete this file once login works.
//
// Visit /api/debug-env in your browser. It tells you whether each env var is
// loaded and its length, WITHOUT revealing the actual values. If any show
// "MISSING" or a length of 0, that's your problem: the var isn't reaching the
// server. Fix .env.local (no quotes, no trailing spaces) and RESTART dev.

export async function GET() {
  const check = (v: string | undefined) => ({
    present: !!v,
    length: v ? v.length : 0,
  });

  return NextResponse.json({
    FAL_KEY: check(process.env.FAL_KEY),
    TOOL_PASSWORD: check(process.env.TOOL_PASSWORD),
    AUTH_SECRET: check(process.env.AUTH_SECRET),
    note: "Delete this route once login works. Values are never shown, only presence + length.",
  });
}
