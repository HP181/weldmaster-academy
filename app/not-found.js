'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-[#F8EE00] px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-[8rem] font-extrabold leading-none tracking-tight"
      >
        404
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold mt-4 text-white"
      >
        Oops! Page Not Found
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-3 text-gray-300 max-w-md"
      >
        The page you’re looking for doesn’t exist or has been moved. Let’s get you back on track.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-8"
      >
        <Link href="https://www.skillworksweld.ca/">
          <Button
            size="lg"
            className="bg-[#F8EE00] text-black font-bold px-8 py-3 rounded-xl hover:bg-yellow-400 transition-all hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
          >
            Back to Home
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
