// vercel-cron: 0 0 * * *

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const deleted = await prisma.note.deleteMany({
    where: { createdAt: { lt: sevenDaysAgo } },
  });
  return NextResponse.json({ deleted: deleted.count });
}