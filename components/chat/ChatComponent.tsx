"use client";

import { useEffect, useState } from 'react';
import {
  Channel,
  ChannelHeader,
  ChannelList,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from 'stream-chat-react';
import { useStreamChat } from '@/providers/stream-chat-provider';
import { useSession } from 'next-auth/react';

export default function ChatComponent() {
  const { client } = useStreamChat();
  const { data: session } = useSession();
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    if (!client || !session?.user) return;

    const initChannel = async () => {
      try {
        // Create channel with explicit permissions
        const channel = client.channel('messaging', 'general', {
          name: 'General',
          members: [session.user._id],
          created_by_id: session.user._id,
        });

        // Set channel options
        await channel.create();
        await channel.addMembers([session.user._id], {
          message: `${session.user.name || 'User'} joined the channel`,
        });
        
        await channel.watch();
        setChannel(channel as any);
      } catch (error) {
        console.error('Error initializing channel:', error);
      }
    };

    initChannel();
  }, [client, session]);

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