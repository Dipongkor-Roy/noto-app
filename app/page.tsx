'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BorderBeam } from '@/components/magicui/border-beam';
import { LineShadowText } from '@/components/magicui/line-shadow-text';
import { useTheme } from "next-themes";
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';


export default function Home() {
  const theme = useTheme();
  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black";

  const [content, setContent] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const createNote = async () => {
      if (!content.trim()) return; 
    const res = await fetch('/api/note', {
      method: 'POST',
      body: JSON.stringify({ content, customSlug }),
    });

    const data = await res.json();
    if (res.ok) {
      toast.success('Successfully Note Created!')
      router.push(`/${data.slug}`);
    } else {
      toast.error('Error creating note');
      setError(data.error);
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
    <div className="relative mt-[45px] w-full backdrop-blur-2xl border-1  rounded-lg  p-4 shadow-xl ">
      <textarea
        className="w-full h-96 backdrop-blur-2xl p-2 rounded-lg "
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note here..."
        
      />
      <BorderBeam duration={8} size={100} />
      </div>
      
      <Input
      type="text"
        className=" p-2 my-5 w-full bg-background  shadow-xl"
        placeholder="Custom Link (optional)"
        value={customSlug}
        onChange={(e) => setCustomSlug(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button onClick={createNote} className="mt-2 px-4 py-2 bg-black text-white rounded-full">
        Create & Share
      </button>
    </div>
  );
}
