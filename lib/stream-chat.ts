import { StreamChat } from 'stream-chat';

// Create a new instance of the StreamChat client
export const streamClient = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STREAM_KEY!
);

// Helper function to get user token
export async function getUserStreamToken(userId: string) {
  try {
    const response = await fetch('/api/stream/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error('Error getting stream token:', error);
    throw error;
  }
} 