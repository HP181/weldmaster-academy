'use client';

import Link from 'next/link';

const Logo = ({ scrolled }) => {
  return (
    <Link href="/" className={`flex items-center gap-2 font-bold text-xl no-underline transition-colors duration-300 ${scrolled ? 'text-[#F8EE00]' : 'text-black'}`}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="4" fill="#F8EE00" />
        <path d="M8 16H24" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
        <path d="M16 8L16 24" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
        <circle cx="16" cy="16" r="4" fill="#000000" />
        {/* Sparks */}
        <path d="M16 4L18 8L14 8L16 4Z" fill="#FF8A00" className="spark spark-1" />
        <path d="M4 16L8 18L8 14L4 16Z" fill="#FF8A00" className="spark spark-2" />
        <path d="M28 16L24 18L24 14L28 16Z" fill="#FF8A00" className="spark spark-3" />
        <path d="M16 28L18 24L14 24L16 28Z" fill="#FF8A00" className="spark spark-4" />
      </svg>
      <span className="tracking-wider">WeldMaster</span>
      <style jsx>{`
        .spark {
          opacity: 0;
          transform: scale(0.8);
          animation: spark 2s infinite;
          transform-origin: center;
        }
        
        .spark-1 { animation-delay: 0s; }
        .spark-2 { animation-delay: 0.2s; }
        .spark-3 { animation-delay: 0.4s; }
        .spark-4 { animation-delay: 0.6s; }
        
        @keyframes spark {
          0%, 100% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </Link>
  );
}

export default Logo;