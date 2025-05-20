'use client';

import { useState } from 'react';

export default function NoteViewer({ content }: { content: string }) {
  const [text, setText] = useState(content);

  return (
    <textarea
      className="w-full h-96 p-2 border"
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
}
