
import { prisma } from '@/lib/db';
import NoteViewer from './NoteViewer';

export default async function NotePage({ params }: { params: { slug: string } }) {
   if (!params?.slug || typeof params.slug !== 'string') {
    return <div>Invalid note link</div>;
  }
  const note = await prisma.note.findUnique({ where: { slug: params.slug } });

  if (!note) return <div>Note not found</div>;

  return <NoteViewer content={note.content} />;
}
