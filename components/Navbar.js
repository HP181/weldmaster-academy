'use client';

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from './ui/button'
import Logo from './Logo'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const navRef = useRef(null)

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Enroll', href: '/enroll' },
    { name: 'Programs', href: '/programs' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav
      ref={navRef}
      className={`fixed w-full top-0 z-50 transition-all ${
        scrolled ? 'bg-black shadow-md py-2' : 'bg-[#fffdf7] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className={`${scrolled ? 'text-white' : 'text-[#1a1a1a]'}`}>
          <Logo color={scrolled ? '#fff' : '#1a1a1a'} />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-semibold uppercase tracking-wide transition-colors ${
                  isActive
                    ? scrolled
                      ? 'text-[#F8EE00]'
                      : 'text-[#ffc107]'
                    : scrolled
                      ? 'text-white hover:text-[#F8EE00]'
                      : 'text-[#1a1a1a] hover:text-[#ffc107]'
                }`}
              >
                {link.name}
              </Link>
            )
          })}
          <Button className={`font-bold px-5 py-2 rounded-none transition-all ${
            scrolled
              ? 'bg-[#F8EE00] text-black hover:bg-black hover:text-[#F8EE00] hover:border hover:border-[#F8EE00]'
              : 'bg-[#ffc107] text-black hover:bg-[#ffb300]'
          }`}>
            Start Learning
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className={`${scrolled ? 'text-white' : 'text-[#1a1a1a]'} md:hidden`}>
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } ${scrolled ? 'bg-black' : 'bg-[#fffdf7]'}`}
      >
        <div className="flex flex-col gap-3 p-4">
          {navLinks.map(link => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-medium px-2 py-2 rounded transition-colors ${
                  isActive
                    ? scrolled
                      ? 'text-[#F8EE00]'
                      : 'text-[#ffc107]'
                    : scrolled
                      ? 'text-white hover:text-[#F8EE00]'
                      : 'text-[#1a1a1a] hover:text-[#ffc107]'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            )
          })}
          <Button className={`w-full font-bold py-2 rounded-none transition-all ${
            scrolled
              ? 'bg-[#F8EE00] text-black hover:bg-black hover:text-[#F8EE00] hover:border hover:border-[#F8EE00]'
              : 'bg-[#ffc107] text-black hover:bg-[#ffb300]'
          }`}>
            Start Learning
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
