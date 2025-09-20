'use client';

import { Suspense } from 'react';
import Chat from '@/components/chat/chat';

// Render the Chat component with a loading fallback using React Suspense
export default function Page() {
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <Chat />
    </Suspense>
  );
}