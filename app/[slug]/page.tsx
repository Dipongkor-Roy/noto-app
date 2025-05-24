import { prisma } from '@/lib/db';
import NoteViewer from './NoteViewer';

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!slug || typeof slug !== 'string') {
    return <div>Invalid note link</div>;
  }
  const note = await prisma.note.findUnique({ where: { slug } });

  if (!note) return <div>Note not found</div>;

  return (
    
    <NoteViewer
      content={note.content}
      passwordProtected={!!note.password}
      slug={note.slug}
    />

  );
}