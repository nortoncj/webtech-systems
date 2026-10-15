import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@lib/supabase/server";
import {
  RATIO_TO_FAL_SIZE,
  buildPrompt,
  STYLES,
  type RatioId,
  type StyleId,
} from "@lib/templates";

// The real security boundary — same Supabase session the /admin routes require.

const TEXT_TO_IMAGE =
  "https://fal.run/fal-ai/bytedance/seedream/v4/text-to-image";
const EDIT = "https://fal.run/fal-ai/bytedance/seedream/v4/edit";

// fal caps at 10 reference images. Vercel caps request bodies around 4.5MB,
// which is why the client downscales before sending — see page.tsx.
const MAX_REFS = 10;

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const falKey = process.env.FAL_KEY;
  if (!falKey) {
    return NextResponse.json(
      { error: "Server not configured (missing FAL_KEY)." },
      { status: 500 },
    );
  }

  let prompt = "";
  let ratio: RatioId = "1:1";
  let styleId: StyleId = "brand";
  let referenceImages: string[] = [];

  try {
    const body = await req.json();
    prompt = String(body?.prompt ?? "").trim();
    ratio = (body?.ratio ?? "1:1") as RatioId;
    styleId = (body?.style ?? "brand") as StyleId;
    referenceImages = Array.isArray(body?.referenceImages)
      ? body.referenceImages.slice(0, MAX_REFS)
      : [];
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  if (!prompt) {
    return NextResponse.json(
      { error: "Add a prompt before generating." },
      { status: 400 },
    );
  }

  if (!STYLES[styleId]) styleId = "brand";
  const image_size = RATIO_TO_FAL_SIZE[ratio] ?? RATIO_TO_FAL_SIZE["1:1"];
  const finalPrompt = buildPrompt(prompt, styleId);

  // Reference images present -> edit endpoint. Otherwise -> text-to-image.
  // fal accepts base64 data URIs directly in image_urls, so there's no
  // separate upload/storage round-trip to manage.
  const usingRefs = referenceImages.length > 0;
  const endpoint = usingRefs ? EDIT : TEXT_TO_IMAGE;

  const payload: Record<string, unknown> = {
    prompt: finalPrompt,
    image_size,
    num_images: 1,
    enable_safety_checker: true, // leave this on.
  };
  if (usingRefs) payload.image_urls = referenceImages;

  try {
    const falRes = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Key ${falKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!falRes.ok) {
      const detail = await falRes.text();
      return NextResponse.json(
        { error: "Generation failed.", detail },
        { status: 502 },
      );
    }

    const data = await falRes.json();
    const url = data?.images?.[0]?.url;
    if (!url) {
      return NextResponse.json(
        { error: "No image came back from the provider." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      url,
      prompt,
      ratio,
      style: styleId,
      usedRefs: usingRefs,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not reach the image provider. Try again." },
      { status: 502 },
    );
  }
}
