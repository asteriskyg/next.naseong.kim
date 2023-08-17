import { NextResponse } from 'next/server'
import { getTwitchStream } from '@/services/stream';

export async function GET() {
  const stream = await getTwitchStream();
  if(!stream) return NextResponse.json([]);

  return NextResponse.json(stream.data[0]);
}