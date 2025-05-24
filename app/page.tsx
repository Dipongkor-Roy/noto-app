'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BorderBeam } from '@/components/magicui/border-beam';
import { LineShadowText } from '@/components/magicui/line-shadow-text';
import { useTheme } from "next-themes";
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { LinkIcon, Lock } from 'lucide-react';
import Header from '@/components/Header/Header';

import { PasswordDialog } from '@/components/modal/modal';
import { ShinyButton } from '@/components/magicui/shiny-button';
import Footer from '@/components/footer/footer';


export default function Home() {
  const theme = useTheme();
  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black";
  const [password, setPassword] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [content, setContent] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const createNote = async () => {
    if (!content.trim()) return;
    const res = await fetch('/api/note', {
      method: 'POST',
      body: JSON.stringify({ content, customSlug, password }),
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
    <>
   {/* <div className='my-1 p-6'>

   </div> */}
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
      <div className="relative mt-[45px] w-full backdrop-blur-2xl border-1  rounded-lg  p-4 shadow-xl ">
        <div className="absolute inset-0 -z-10  w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
        <textarea
          className="w-full h-96 backdrop-blur-2xl p-2 rounded-lg "
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note here..."

        />
        <BorderBeam duration={8} size={100} />
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between gap-1 w-full">
          <span className=" text-gray-600">
            <LinkIcon />
          </span>
          
          <Input
            type="text"
            className="pl-12 p-5 my-5 w-full bg-background shadow-xl"
            placeholder="Custom Link (optional)"
            value={customSlug}
            onChange={(e) => setCustomSlug(e.target.value)}
          />
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      <div className='flex justify-between items-center mt-2'>
        <div>
          <button onClick={createNote} className="mt-2 px-4 py-2 bg-black text-white rounded-full">
            Create & Share
          </button>
        </div>
        <div className="p-6">
          {/* ...other UI... */}
          <span>
            <ShinyButton
              className="px-3 py-1 text-xs"
              onClick={() => setDialogOpen(true)}
              style={{
                opacity: content.trim() ? 1 : 0.5,
                pointerEvents: content.trim() ? 'auto' : 'none',
              }}
            >
              <span className='flex items-center justify-center gap-1'>
                <Lock className="text-[#646464] h-[20px]" />
                Set Password
              </span>
            </ShinyButton>
          </span>
          <PasswordDialog
            open={dialogOpen}
            setOpen={(open) => {
              setDialogOpen(open);
              // Show toast only when closing after setting a password
              if (!open && password.trim()) {
                toast.success('Password set successfully!');
              }
            }}
            password={password}
            setPassword={setPassword}
          />

        </div>
      </div>

      <div className='mt-[24px]'>
        <div className="mt-9 mb-0 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Notes are encrypted and available for 7 days.</p>
        </div>

      <Footer/>
      </div>
    </div>
    </>
  );
}
