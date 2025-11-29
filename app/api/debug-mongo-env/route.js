export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const uri = process.env.MONGODB_URI;

  return Response.json({
    raw: JSON.stringify(uri),                             // <- shows hidden characters
    first20: uri?.slice(0,20),
    firstCharCode: uri ? uri.charCodeAt(0) : null,        // <- tells if first char is space/newline
    length: uri?.length
  });
}
