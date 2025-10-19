'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-[#F8EE00]">
      {/* Spinner */}
      <motion.div
        className="w-16 h-16 border-[4px] border-[#F8EE00] border-t-transparent rounded-full animate-spin"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      ></motion.div>

      {/* Text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-6 text-lg font-semibold tracking-wide"
      >
        Loading...
      </motion.p>
    </div>
  );
}
