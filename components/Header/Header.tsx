'use client';

import Link from 'next/link';
import { SpinningText } from '../magicui/spinning-text';

const Header: React.FC = () => {
  return (
    <header className="w-full py-5 mb-6 px-5 flex  items-center justify-between">
      <Link href="/">
        <h1 className="text-2xl  font-bold bg-gradient-to-r from-[#6366f1] to-[#a21caf] bg-clip-text text-transparent tracking-tight mb-2">
          Noto
        </h1>
      </Link>
      <div className="  ">
        <Link href="https://dipongkor-roy.vercel.app">
          <SpinningText className="text-base mr-7 flex items-center whitespace-nowrap">
            learn more • grow more •
          </SpinningText>
        </Link>
      </div>
    </header>
  );
};

export default Header;