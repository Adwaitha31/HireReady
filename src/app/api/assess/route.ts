import { NextRequest, NextResponse } from "next/server";
import { generateAssessment } from "@/lib/gemini";
import type { UserProfile } from "@/types/assessment";

export async function POST(req: NextRequest) {
  try {
    const profile: UserProfile = await req.json();

    if (!profile.name || !profile.targetRole) {
      return NextResponse.json(
        { error: "Name and target role are required." },
        { status: 400 }
      );
    }

    const result = await generateAssessment(profile);
    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
