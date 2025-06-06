'use client';

import { BorderBeam } from '@/components/magicui/border-beam';
import { LineShadowText } from '@/components/magicui/line-shadow-text';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { Copy } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Footer from '@/components/footer/footer';
import Header from '@/components/Header/Header';

export default function NoteViewer({
  content,
  passwordProtected = false,
  slug = '',
}: {
  content: string;
  passwordProtected?: boolean;
  slug?: string;
}) {
  const [showContent, setShowContent] = useState(!passwordProtected);
  const [password, setPassword] = useState('');
  const [text] = useState(content);
  const theme = useTheme();
  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black";

  // Unlock handler for password-protected notes
  const handleUnlock = async () => {
    const res = await fetch(`/api/note/unlock`, {
      method: 'POST',
      body: JSON.stringify({ slug, password }),
    });
    if (res.ok) {
      setShowContent(true);
    } else {
      toast.error('Incorrect password');
    }
  };

  // Copy to clipboard handler
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error('Failed to copy!');
    }
  };

  if (!showContent && passwordProtected) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-xl w-full max-w-sm">
          <h2 className="mb-4 text-lg font-semibold text-center">This note is password protected</h2>
          <input
            type="password"
            className="border p-2 rounded w-full mb-4"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            onClick={handleUnlock}
            className="bg-black text-white px-4 py-2 rounded w-full"
          >
            Unlock
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-6">
        <Header />
        <Link href="/"><h1 className='animate-in fade-in zoom-in duration-400 text-center mb-2 text-5xl font-semibold leading-none tracking-tighter sm:text-6xl md:text-7xl '> Share <br /> {" "}
          <LineShadowText className="italic " shadowColor={shadowColor}>
            notes
          </LineShadowText>
          {" "} instantly
        </h1>
        </Link>
        <h3 className='  my-3 text-center  text-xl italic font-stretch-semi-condensed'>
          Write a note, generate a link, and share it with anyone. Simple as that.
        </h3>
        <div className="flex flex-wrap justify-center gap-4 mt-10 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>No signup required</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>Instant sharing</span>
          </div>
          {/* <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span>Beautiful design</span>
          </div> */}
        </div>

        {/* Add this block below the features */}
        <div className="flex justify-center mt-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              readOnly
              value={typeof window !== "undefined" ? window.location.href : ""}
              className="w-full border rounded px-4 py-2 pr-10 bg-gray-100 text-gray-700 focus:outline-none"
              onFocus={e => e.target.select()}
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
              onClick={() => {
                if (typeof window !== "undefined") {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success('Link copied!');
                }
              }}
              tabIndex={-1}
            >
              <Copy size={18} />
            </button>
          </div>
        </div>

        <div className="relative mt-[45px] w-full backdrop-blur-2xl border-1 rounded-lg p-4 shadow-xl">
          <div className="absolute inset-0 -z-10  w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
          <textarea
            className="w-full h-96 backdrop-blur-2xl p-2 rounded-lg"
            value={text}
            readOnly
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

      <div className='mt-[24px]'>
        <Footer />
      </div>
    </>
  );
}