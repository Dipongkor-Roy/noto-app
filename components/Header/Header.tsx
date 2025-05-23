'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

const Header: React.FC = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';

  return (
    <header className="w-full py-4 mb-5 px-6 md:px-8 flex justify-between items-center">
      <div className="flex items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#6366f1] to-[#a21caf] bg-clip-text text-transparent tracking-tight">
             Noto
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          className="p-2 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={20} className="text-gray-700" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;