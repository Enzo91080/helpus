"use client";

import { useEffect, useState } from 'react';
import {
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from 'stream-chat-react';
import { useStreamChat } from '@/providers/stream-chat-provider';
import { useSession } from 'next-auth/react';

interface ChatComponentProps {
  channelId?: string;
  members?: string[];
}

export default function ChatComponent({ channelId, members }: ChatComponentProps) {
  const { client } = useStreamChat();
  const { data: session } = useSession();
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    if (!client || !session?.user) return;

    const initChannel = async () => {
      try {
        // If we have specific members (donation chat), initialize them first
        if (members?.length) {
          // Fetch user data first
          const userDataPromises = members.map(async (memberId) => {
            const response = await fetch(`/api/users/${memberId}`);
            return response.json();
          });

          const usersData = await Promise.all(userDataPromises);

          // Create users in Stream via server endpoint
          await fetch('/api/stream/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ users: usersData }),
          });
        }

        // Create/initialize the channel
        const channelInstance = client.channel('messaging', channelId || 'general', {
          members: members || [session.user._id],
          name: channelId ? undefined : 'General Chat',
        });

        await channelInstance.watch();
        setChannel(channelInstance as any);
      } catch (error) {
        console.error('Error initializing channel:', error);
      }
    };

    initChannel();
  }, [client, session, channelId, members]);

  if (!channel) return null;

  return (
    <div className="h-[600px]">
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </div>
  );
} 