import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  const { slug, password } = await req.json();
  const note = await prisma.note.findUnique({ where: { slug } });
  if (!note) return new Response('Not found', { status: 404 });
  if (note.password !== password) return new Response('Unauthorized', { status: 401 });
  return new Response('OK');
}