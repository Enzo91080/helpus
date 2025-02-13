import { StreamChat } from 'stream-chat';
import { NextRequest, NextResponse } from 'next/server';

const serverClient = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STREAM_KEY!,
  process.env.STREAM_SECRET!
);

export async function POST(req: NextRequest) {
  try {
    const { users } = await req.json();

    // Create/update users in Stream
    const promises = users.map(async (userData: any) => {
      await serverClient.upsertUser({
        id: userData._id,
        name: userData.name || userData._id,
        image: userData.image || undefined,
      });
    });

    await Promise.all(promises);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error creating Stream users:', error);
    return NextResponse.json(
      { error: 'Error creating users' },
      { status: 500 }
    );
  }
} 