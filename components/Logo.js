'use client';

import React from 'react'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 no-underline">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="4" className="fill-yellow-400" />
        <path d="M8 16H24" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
        <path d="M16 8L16 24" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
        <circle cx="16" cy="16" r="4" className="fill-black" />

        {/* Sparks */}
        <path
          d="M16 4L18 8L14 8L16 4Z"
          className="fill-orange-400 animate-[spark_2s_infinite]"
          style={{
            animationName: 'spark',
            animationDuration: '2s',
            animationIterationCount: 'infinite',
          }}
        />
        <path
          d="M4 16L8 18L8 14L4 16Z"
          className="fill-orange-400 animate-[spark_2s_infinite]"
          style={{ animationDelay: '0.2s' }}
        />
        <path
          d="M28 16L24 18L24 14L28 16Z"
          className="fill-orange-400 animate-[spark_2s_infinite]"
          style={{ animationDelay: '0.4s' }}
        />
        <path
          d="M16 28L18 24L14 24L16 28Z"
          className="fill-orange-400 animate-[spark_2s_infinite]"
          style={{ animationDelay: '0.6s' }}
        />
      </svg>
      <span>WeldMaster</span>

      {/* Inline keyframes for Tailwind */}
      <style jsx>{`
        @keyframes spark {
          0%, 100% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </Link>
  )
}

export default Logo
