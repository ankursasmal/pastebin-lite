import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Paste from "../../../../models/Paste";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params; // ✅ FIX HERE

    if (!id) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404 }
      );
    }

    const paste = await Paste.findById(id);

    if (!paste) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404 }
      );
    }

    // ---- Deterministic time (for tests) ----
    const testMode = process.env.TEST_MODE === "1";
    const testNow = req.headers.get("x-test-now-ms");
    const now =
      testMode && testNow
        ? new Date(Number(testNow))
        : new Date();

    // ---- TTL check ----
    if (paste.expiresAt && now > paste.expiresAt) {
      return NextResponse.json(
        { error: "Expired" },
        { status: 404 }
      );
    }

    // ---- View limit check ----
    if (paste.maxViews !== null && paste.views >= paste.maxViews) {
      return NextResponse.json(
        { error: "View limit exceeded" },
        { status: 404 }
      );
    }

    // ---- Increment views ----
    paste.views += 1;
    await paste.save();

    return NextResponse.json({
      content: paste.content,
      remaining_views:
        paste.maxViews === null
          ? null
          : Math.max(paste.maxViews - paste.views, 0),
      expires_at: paste.expiresAt,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
