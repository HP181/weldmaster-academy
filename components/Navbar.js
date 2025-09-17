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
    // { name: 'Testimonials', href: '/testimonials' },
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
      if (navRef.current && !navRef.current.contains(event.target)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav
      ref={navRef}
      className={`fixed w-full top-0 z-50 transition-all ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Logo />

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-medium transition-colors ${
                  isActive ? 'text-yellow-500' : 'text-gray-900 hover:text-yellow-500'
                }`}
              >
                {link.name}
              </Link>
            )
          })}
          <Button className="bg-yellow-500 text-black font-bold hover:bg-yellow-400">Start Learning</Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all overflow-hidden bg-white shadow-md ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-3 p-4">
          {navLinks.map(link => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-medium px-2 py-1 rounded transition-colors ${
                  isActive ? 'bg-yellow-100 text-yellow-500' : 'text-gray-900 hover:text-yellow-500'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            )
          })}
          <Button className="w-full bg-yellow-500 text-black font-bold hover:bg-yellow-400">
            Start Learning
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
