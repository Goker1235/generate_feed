import { NextResponse } from "next/server";
import { buildFeed } from "@/utils/builderFeed";
// import { validateFeed } from "@/utils/validateFeed";

export const runtime = "nodejs";

export async function GET() {
  const xml = buildFeed();
  // const validation = await validateFeed(xml);

  // if (!validation.ok) {
  //   console.error("Feed validation errors:", validation.errors);

  //   return NextResponse.json(
  //     { error: "Feed is not valid", details: validation.errors },
  //     { status: 500 }
  //   );
  // }

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Content-Disposition": 'attachment; filename="feed.xml"'
    }
  });
}
