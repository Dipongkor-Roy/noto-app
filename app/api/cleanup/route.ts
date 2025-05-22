// filepath: /Users/dipongkorroy/Documents/Web Dev/noto-app/app/api/cleanup/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const fifteenDaysAgo = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000);
  const deleted = await prisma.note.deleteMany({
    where: { createdAt: { lt: fifteenDaysAgo } },
  });
  return NextResponse.json({ deleted: deleted.count });
}