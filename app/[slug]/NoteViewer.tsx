'use client';

import { BorderBeam } from '@/components/magicui/border-beam';
import { LineShadowText } from '@/components/magicui/line-shadow-text';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { Copy } from 'lucide-react';
import toast from 'react-hot-toast';
export default function NoteViewer({ content }: { content: string }) {
  const [text, setText] = useState(content);
  const theme = useTheme();
  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black";

  // Copy to clipboard handler
  const handleCopy = async () => {
    try {
      
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // Optionally handle error
      toast.error('Failed to copy!');
    }
  };

  return (
    <div className="p-6">
      <h1 className=' text-center mb-2 text-5xl font-semibold leading-none tracking-tighter sm:text-6xl md:text-7xl '> 📝 {" "}
        <LineShadowText className="italic" shadowColor={shadowColor}>
          Noto
        </LineShadowText>
      </h1>
      <h3 className='my-3 text-center  text-2xl italic font-stretch-semi-condensed'>
        Generate a unique or custom shareable link for every note you create.
      </h3>
      <div className="relative mt-[45px] w-full backdrop-blur-2xl border-1 rounded-lg p-4 shadow-xl">
        <textarea
          className="w-full h-96 backdrop-blur-2xl p-2 rounded-lg"
          value={text}
          readOnly 
          onChange={(e) => setText(e.target.value)}
        />
        <BorderBeam duration={8} size={100} />
        <button
          onClick={handleCopy}
          className="absolute top-4 right-4 bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition"
        >
           <Copy />
        </button>
      </div>
    </div>
  );
}