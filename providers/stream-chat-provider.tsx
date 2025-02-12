"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { StreamChat, User } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import { useSession } from 'next-auth/react';
import { streamClient, getUserStreamToken } from '@/lib/stream-chat';

import 'stream-chat-react/dist/css/v2/index.css';

interface StreamChatProviderProps {
  children: React.ReactNode;
}

const StreamChatContext = createContext<{
  client: StreamChat | null;
  setClient: (client: StreamChat | null) => void;
}>({
  client: null,
  setClient: () => {},
});

export const StreamChatProvider = ({ children }: StreamChatProviderProps) => {
  const [client, setClient] = useState<StreamChat | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user) {
      return;
    }

    const initChat = async () => {
      try {
        const token = await getUserStreamToken(session.user._id);
        
        if (!token) {
          throw new Error('Failed to get chat token');
        }

        if (client) {
          await client.disconnectUser();
        }

        await streamClient.connectUser(
          {
            id: session.user._id,
            name: session.user.name || session.user._id,
            image: session.user.image || '',
          },
          token
        );

        setClient(streamClient);
      } catch (error) {
        console.error('Error connecting to Stream:', error);
        setClient(null);
      }
    };

    initChat();

    return () => {
      if (client) {
        streamClient.disconnectUser();
        setClient(null);
      }
    };
  }, [session]);

  return (
    <StreamChatContext.Provider value={{ client, setClient }}>
      {client ? (
        <Chat client={client}>
          {children}
        </Chat>
      ) : (
        children
      )}
    </StreamChatContext.Provider>
  );
};

export const useStreamChat = () => useContext(StreamChatContext); 