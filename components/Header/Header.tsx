'use client';


import Link from 'next/link';
import { SpinningText } from '../magicui/spinning-text';

const Header: React.FC = () => {


  return (
    <header className="w-full py-4 mb-5 px-6 md:px-8 flex justify-between items-center">
      <div className="flex items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#6366f1] to-[#a21caf] bg-clip-text text-transparent tracking-tight">
             Noto
          </h1>
        </Link>
      </div>
      <Link href="https://dipongkor-roy.vercel.app" className=""> {/* Match the logo height */}
        <SpinningText className="" /* adjust text-base/h-8 as needed */>
          learn more • grow more •
        </SpinningText>
      </Link>
    </header>
  );
};

export default Header;