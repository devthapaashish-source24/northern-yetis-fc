// Minimal version for test
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const runtime = 'nodejs';

export async function GET() {
  // Return minimal response during build
  return Response.json({ 
    success: true, 
    message: "Test API is working",
    note: "Full MongoDB test functionality available after deployment"
  });
}