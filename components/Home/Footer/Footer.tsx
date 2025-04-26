import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className="pt-16 pb-16 bg-[#0f0715]">
      <div>
        <Image
          src="/images/LOGO2.png"
          alt="logo"
          width={180}
          height={180}
          className="mx-auto"
        />
      </div>
      <div className="flex items-center flex-wrap justify-center gap-6 text-white font-bold mt-8">
        <Link href="#home" className="hover:text-gray-300 transition">
          Home
        </Link>
        <Link href="#aboit" className="hover:text-gray-300 transition">
          About
        </Link>
        <Link href="#services" className="hover:text-gray-300 transition">
          Services
        </Link>
        <Link href="#projects" className="hover:text-gray-300 transition">
          Projects
        </Link>
        <Link href="#education" className="hover:text-gray-300 transition">
          Education
        </Link>
        <Link href="#skills" className="hover:text-gray-300 transition">
          Skills
        </Link>
        <Link href="#reviews" className="hover:text-gray-300 transition">
          Reviews
        </Link>
        <Link href="#hobbies" className="hover:text-gray-300 transition">
          Hobbies
        </Link>
        <Link href="#blog" className="hover:text-gray-300 transition">
          Blogs
        </Link>
        <Link href="#contact" className="hover:text-gray-300 transition">
          Contacts
        </Link>
      </div>

      <div className="mt-6">
        <p className="text-white text-opacity-60 text-center">
          ©2025 All Rights Reserved
        </p>
        <p className="text-white text-opacity-60 mt-3 text-center">
          By Franklin Muriithi
        </p>
      </div>
    </div>
  )
}

export default Footer
