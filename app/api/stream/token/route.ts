import { StreamChat } from 'stream-chat';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { nextauthOptions } from '@/lib/nextauth-options';

const serverClient = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STREAM_KEY!,
  process.env.STREAM_SECRET
);

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(nextauthOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { userId } = await req.json();
    
    // Generate a user token
    const token = serverClient.createToken(userId);

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Error generating stream token:', error);
    return NextResponse.json(
      { error: 'Error generating token' },
      { status: 500 }
    );
  }
} 