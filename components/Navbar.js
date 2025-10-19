'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import Logo from './Logo';
import { useUser, UserButton } from '@clerk/nextjs';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const navRef = useRef(null);
  const { isSignedIn } = useUser();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Programs', href: '/enroll' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
  ];

  // Scroll handler for sticky navbar styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black shadow-md py-2' : 'py-4 bg-[#F8EE00]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Logo scrolled={scrolled} />

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative font-semibold uppercase tracking-wide transition-colors ${
                  isActive
                    ? scrolled
                      ? 'text-[#F8EE00] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-[#F8EE00]'
                      : 'text-black after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-black font-bold'
                    : scrolled
                    ? 'text-white hover:text-[#F8EE00]'
                    : 'text-black hover:text-[#000000] hover:font-bold'
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* UserButton if signed in */}
          {isSignedIn && (
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: scrolled
                    ? { border: '2px solid #F8EE00' }
                    : { border: '2px solid black' },
                },
              }}
              afterSignOutUrl="/"
            />
          )}

          {/* Start Learning button - always visible */}
          <Button
            onClick={() => router.push('/enroll')}
            className={`font-bold px-6 py-2.5 rounded-lg hover:-translate-y-0.5 cursor-pointer transition-all ${
              scrolled
                ? 'bg-[#F8EE00] text-black hover:bg-yellow-300'
                : 'bg-black text-[#F8EE00] hover:bg-[#222222]'
            }`}
          >
            Start Learning
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className={`md:hidden ${scrolled ? 'text-[#F8EE00]' : 'text-black'}`}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="p-2"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          scrolled ? 'bg-black' : 'bg-[#F8EE00]'
        } ${isOpen ? 'max-h-[400px] py-3 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
      >
        <div className="flex flex-col gap-3 p-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative font-medium px-2 py-2 rounded transition-colors ${
                  isActive
                    ? scrolled
                      ? 'text-[#F8EE00] font-bold'
                      : 'text-black font-bold'
                    : scrolled
                    ? 'text-white hover:text-[#F8EE00]'
                    : 'text-black hover:font-bold'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}

          {/* UserButton if signed in */}
          {isSignedIn && (
            <div className="flex justify-center mt-3">
              <UserButton afterSignOutUrl="/" />
            </div>
          )}

          {/* Mobile Start Learning button - always visible */}
          <Button
            onClick={() => {
              setIsOpen(false);
              router.push('/enroll');
            }}
            className={`w-full font-bold py-2.5 mt-2 rounded-none transition-all ${
              scrolled
                ? 'bg-[#F8EE00] text-black hover:bg-yellow-300'
                : 'bg-black text-[#F8EE00] hover:bg-[#222222]'
            }`}
          >
            Start Learning
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
