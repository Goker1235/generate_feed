let lastSelected: any = null;

export async function POST(req: Request) {
  const data = await req.json();
  lastSelected = data;

  return Response.json({ success: true });
}

export async function GET() {
  return Response.json(lastSelected || {});
}