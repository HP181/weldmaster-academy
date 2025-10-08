'use client';

import Image from 'next/image';
import Link from 'next/link';

const Logo = ({ scrolled }) => {
  return (
    <Link href="/" className={`flex items-center gap-2 font-bold text-xl no-underline transition-colors duration-300 ${scrolled ? 'text-[#F8EE00]' : 'text-black'}`}>
     <Image 
        src={scrolled ? "/dark-welding.png" : "/welding.png"}
        alt="WeldMaster Logo"
        width={1000}
        height={1000}
        className='h-16 w-48 object-contain'
     />
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