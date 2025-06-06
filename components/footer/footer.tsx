import React from 'react';

const Footer: React.FC = () => {
  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 mt-10 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span>Notes are encrypted and available for 7 days.</span>
            </div>
          </div>
 
    <footer className="w-full py-4 mt-10">
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Noto. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a 
              href="" 
              className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200"
            >
              Privacy
            </a>
            <a 
              href="" 
              className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200"
            >
              Terms
            </a>
            <a 
              href="https://dipongkor-roy.vercel.app" 
              className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
       </>
  );
};

export default Footer;