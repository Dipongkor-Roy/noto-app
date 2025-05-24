import { prisma } from '@/lib/db';
import { generateSlug } from '@/lib/generateSlug';

export async function POST(req: Request) {
  const { content, customSlug, password } = await req.json();

  const slug = customSlug?.trim() || generateSlug();

  // Check if slug already exists
  const exists = await prisma.note.findUnique({ where: { slug } });
  if (exists) {
    return new Response(JSON.stringify({ error: 'Slug already exists.' }), { status: 409 });
  }

  const note = await prisma.note.create({
    data: { slug, content, password }, 
  });

  return Response.json({ slug: note.slug });
}