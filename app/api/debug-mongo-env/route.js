export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const uri = process.env.MONGODB_URI;

  return Response.json({
    isDefined: uri !== undefined,
    startsWithMongo: uri?.startsWith("mongodb"),
    length: uri ? uri.length : 0,
    // show a safe preview so we can inspect it
    preview: uri ? uri.slice(0, 40) : null,
  });
}
