"use client"
import { navLinks } from '@/constant/constant'
import Image from 'next/image'
import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import { HiBars3BottomRight } from 'react-icons/hi2'

//define props types
type Props = {
    openNav:()=>void
}

const Nav = ( { openNav }:Props ) => {
    const [navBg, setNavBg] = useState(false)

    useEffect(()=> {
        const handler = () => {
            if(window.scrollY >= 90){
                setNavBg(true)
            }
            if(window.scrollY < 90){
                setNavBg(false)
            }
        }

        window.addEventListener("scroll", handler)

        return () => {
            window.removeEventListener("scroll", handler)
        };
    }, []);

  return (
    <div className={`fixed ${navBg ? 'bg-[#240b39]': "fixed"} h-[12vh] z-[10] w-full transition-all duration-200`}>
        <div className='flex items-center h-full justify-between w-[95%] sm:w-[90%] xl:w-[80%] mx-auto'>
            {/* LOGO */}
            <Image 
                src="/images/LOGO2.png"  
                alt={'LOGO'} 
                width={130} 
                height={130} 
                className='ml-[-1.5rem] sm:ml-0'/>

            {/*  NAV LINKS */}
            <div className='flex items-center space-x-10'>
                <div className='hidden lg:flex items-center space-x-8'>
                {navLinks.map((navlink)=>{
                return (
                    <Link key={navlink.id} href={navlink.url} >
                        <p className='nav__link'>{navlink.label}</p>
                    </Link>
                )
                })}
                </div>
                {/* BUTTON to scroll to contact me */}
                <div className='flex items-center space-x-4'>
                    <Link href="#contact" >
                        <button className=' md:px-10 md:py-3 px-8 py-3 text-blue-800 font-semibold sm:text-base text-sm bg-white hover:bg-gray-200 transition-all duration-200 rounded-lg'>
                            Contact Me
                        </button>
                    </Link>
                    

                    {/* BURGER MENU */}
                    <HiBars3BottomRight 
                        className='w-8 h-8 cursor-pointer text-white lg:hidden'
                        onClick={openNav}
                    />
                </div>
            </div>

        </div>
      
    </div>
  )
}

export default Nav