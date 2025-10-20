'use client';

import React from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import Logo from './Logo'

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        
        {/* Logo & Description */}
        <div>
          <div className="inline-block bg-[#F8EE00] p-2 mb-4">
            <Logo />
          </div>
          <p className="text-gray-300 mb-4">
            Empowering the next generation of welders with industry-leading education and hands-on training.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-white hover:text-[#F8EE00]"><Facebook size={20} /></a>
            <a href="#" className="text-white hover:text-[#F8EE00]"><Twitter size={20} /></a>
            <a href="#" className="text-white hover:text-[#F8EE00]"><Instagram size={20} /></a>
            <a href="#" className="text-white hover:text-[#F8EE00]"><Youtube size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-[#F8EE00]">Quick Links</h3>
          <ul className="flex flex-col gap-2">
            <li><Link href="/" className="text-white hover:text-[#F8EE00]">Home</Link></li>
            <li><Link href="/about" className="text-white hover:text-[#F8EE00]">About Us</Link></li>
            <li><Link href="/features" className="text-white hover:text-[#F8EE00]">Courses</Link></li>
            <li><Link href="/pricing" className="text-white hover:text-[#F8EE00]">Pricing</Link></li>
            <li><Link href="/contact" className="text-white hover:text-[#F8EE00]">Contact</Link></li>
          </ul>
        </div>

        {/* Courses */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-[#F8EE00]">Courses</h3>
          <ul className="flex flex-col gap-2">
            <li><Link href="#" className="text-white hover:text-[#F8EE00]">MIG Welding</Link></li>
            <li><Link href="#" className="text-white hover:text-[#F8EE00]">TIG Welding</Link></li>
            <li><Link href="#" className="text-white hover:text-[#F8EE00]">Stick Welding</Link></li>
            <li><Link href="#" className="text-white hover:text-[#F8EE00]">Flux-Cored Arc Welding</Link></li>
            <li><Link href="#" className="text-white hover:text-[#F8EE00]">Certification Prep</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-[#F8EE00]">Contact Us</h3>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-3">
              <MapPin className="text-[#F8EE00]" />
              <span className="text-white">1195 Franklin Blvd, Unit 08, Cambridge ON N1R 7R7, Canada</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-[#F8EE00]" />
              <span className="text-white">+1 (249) 979-2155</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-[#F8EE00]" />
              <span className="text-white">Info@skillworksweld.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#F8EE00]/30 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} WeldMaster. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link href="#" className="text-gray-400 text-sm hover:text-[#F8EE00]">Privacy Policy</Link>
          <Link href="#" className="text-gray-400 text-sm hover:text-[#F8EE00]">Terms of Service</Link>
          <Link href="#" className="text-gray-400 text-sm hover:text-[#F8EE00]">Sitemap</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
