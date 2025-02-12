import { StreamChat } from 'stream-chat';

// Create a new instance of the StreamChat client
export const streamClient = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STREAM_KEY!
);

// Helper function to get user token
export const getUserStreamToken = async (userId: string): Promise<string> => {
  try {
    const response = await fetch('/api/stream/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error('Failed to get stream token');
    }

    const data = await response.json();
    
    if (!data.token) {
      throw new Error('No token received from server');
    }

    return data.token;
  } catch (error) {
    console.error('Error getting stream token:', error);
    throw error; // Re-throw to handle it in the provider
  }
}; 