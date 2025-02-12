import { StreamChat } from 'stream-chat';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { nextauthOptions } from '@/lib/nextauth-options';

const serverClient = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STREAM_KEY!,
  process.env.STREAM_SECRET!
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

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Always create/update the user with default values if some are missing
    await serverClient.upsertUser({
      id: userId,
      name: session.user.name || userId, // Fallback to userId if name is missing
      image: session.user.image || undefined,
      role: session.user.role === 'admin' ? 'admin' : 'admin'
    });

    // Generate a user token - this will always work for a valid user
    const token = serverClient.createToken(userId);

    if (!token) {
      throw new Error('Failed to generate token');
    }

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Error generating stream token:', error);
    return NextResponse.json(
      { error: 'Error generating token' },
      { status: 500 }
    );
  }
} 