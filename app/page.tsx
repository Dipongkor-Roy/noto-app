'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [content, setContent] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const createNote = async () => {
    const res = await fetch('/api/note', {
      method: 'POST',
      body: JSON.stringify({ content, customSlug }),
    });

    const data = await res.json();
    if (res.ok) {
      router.push(`/${data.slug}`);
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">SlashNote</h1>
      <textarea
        className="w-full h-48 border p-2"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note here..."
      />
      <input
        className="border p-2 my-2 w-full"
        placeholder="Custom slug (optional)"
        value={customSlug}
        onChange={(e) => setCustomSlug(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button onClick={createNote} className="mt-2 px-4 py-2 bg-black text-white rounded">
        Create & Share
      </button>
    </div>
  );
}
