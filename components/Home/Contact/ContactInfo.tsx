import React from 'react'
import { FaEnvelope, FaMap, FaPhone, FaGithub, FaYoutube, FaWhatsapp, FaTwitter, FaLinkedin, FaSnapchat, FaTiktok, FaInstagram } from 'react-icons/fa'
import { contactData, linksData } from '@/Data/data'
import Link from 'next/link'

const ContactInfo = () => {
  return (
    <div>
        <div className='flex items-center space-x-8'>
            <a href={`tel:${contactData.phone}`} className="group">
                <div className='h-10 w-10 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-emerald-500 to-orange-900 flex items-center justify-center flex-col transition-transform duration-200 group-hover:scale-105'>
                    <FaPhone className='w-full h-full md:w-7 md:h-7 text-white group-hover:animate-pulse'/>
                </div>
            </a>
            <div>
                <h1 className='text-lg sm:text-xl text-white font-bold'>
                    Call/Text
                </h1>
                <a href={`tel:${contactData.phone}`} className='text-white text-base sm:text-lg text-opacity-70 hover:text-opacity-100 hover:underline transition-all duration-200'>
                    {contactData.phone}
                </a>
            </div>
        </div>

        <div className='flex items-center space-x-8 mt-8 mb-8'>
            <a href={`mailto:${contactData.email}`} className="group">
                <div className='h-10 w-10 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-emerald-500 to-orange-900 flex items-center justify-center flex-col transition-transform duration-200 group-hover:scale-105'>
                    <FaEnvelope className='w-full h-full md:w-7 md:h-7 text-white group-hover:animate-pulse'/>
                </div>
            </a>
            <div>
                <h1 className='text-lg sm:text-xl text-white font-bold'>
                    Email
                </h1>
                <a href={`mailto:${contactData.email}`} className='text-white text-base sm:text-lg text-opacity-70 hover:text-opacity-100 hover:underline transition-all duration-200'>
                    {contactData.email}
                </a>
            </div>
        </div>
        
        <div className='flex items-center space-x-8 '>
            <div className='h-10 w-10 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-emerald-500 to-orange-900 flex items-center justify-center flex-col '>
                <FaMap className=' w-full h-full md:w-7 md:h-7 text-white'/>
            </div>
            <div >
                <h1 className='text-lg sm:text-xl text-white font-bold'>
                    Physical Address
                </h1>
                <h1 className='text-white text-base sm:text-lg text-opacity-70'>
                    {contactData.address}
                </h1>
            </div>
        </div>
        
        {/*SOCIAL LINKS */}
        <div className="mt-12">
            <h1 className='text-lg sm:text-xl text-white font-bold mb-4'>
                Also Connect With Me Via:
            </h1>
            <div className="flex flex-wrap items-center gap-4">
                <Link href={linksData.github} target="_blank" rel="noopener noreferrer">
                    <div className='h-10 w-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-purple-500 to-orange-900 flex items-center justify-center hover:scale-110 transition-transform duration-200'>
                        <FaGithub className='w-5 h-5 md:w-6 md:h-6 text-white'/>
                    </div>
                </Link>
                
                <Link href={linksData.youtube} target="_blank" rel="noopener noreferrer">
                    <div className='h-10 w-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-purple-500 to-orange-900 flex items-center justify-center hover:scale-110 transition-transform duration-200'>
                        <FaYoutube className='w-5 h-5 md:w-6 md:h-6 text-white'/>
                    </div>
                </Link>
                
                <Link href={linksData.whatsapp} target="_blank" rel="noopener noreferrer">
                    <div className='h-10 w-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-purple-500 to-orange-900 flex items-center justify-center hover:scale-110 transition-transform duration-200'>
                        <FaWhatsapp className='w-5 h-5 md:w-6 md:h-6 text-white'/>
                    </div>
                </Link>
                
                <Link href={linksData.x} target="_blank" rel="noopener noreferrer">
                    <div className='h-10 w-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-purple-500 to-orange-900 flex items-center justify-center hover:scale-110 transition-transform duration-200'>
                        <FaTwitter className='w-5 h-5 md:w-6 md:h-6 text-white'/>
                    </div>
                </Link>
                
                <Link href={linksData.linkedin} target="_blank" rel="noopener noreferrer">
                    <div className='h-10 w-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-purple-500 to-orange-900 flex items-center justify-center hover:scale-110 transition-transform duration-200'>
                        <FaLinkedin className='w-5 h-5 md:w-6 md:h-6 text-white'/>
                    </div>
                </Link>
                
                <Link href={linksData.snapchat} target="_blank" rel="noopener noreferrer">
                    <div className='h-10 w-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-purple-500 to-orange-900 flex items-center justify-center hover:scale-110 transition-transform duration-200'>
                        <FaSnapchat className='w-5 h-5 md:w-6 md:h-6 text-white'/>
                    </div>
                </Link>
                
                <Link href={linksData.tiktok} target="_blank" rel="noopener noreferrer">
                    <div className='h-10 w-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-purple-500 to-orange-900 flex items-center justify-center hover:scale-110 transition-transform duration-200'>
                        <FaTiktok className='w-5 h-5 md:w-6 md:h-6 text-white'/>
                    </div>
                </Link>
                
                <Link href={linksData.instagram} target="_blank" rel="noopener noreferrer">
                    <div className='h-10 w-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-purple-500 to-orange-900 flex items-center justify-center hover:scale-110 transition-transform duration-200'>
                        <FaInstagram className='w-5 h-5 md:w-6 md:h-6 text-white'/>
                    </div>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default ContactInfo





/* import { contactData } from '@/Data/data'
import React from 'react'
import { FaEnvelope, FaMap, FaPhone } from 'react-icons/fa'

const ContactInfo = () => {
  return (
    <div>
        <div className='flex items-center space-x-8 '>
            <div className='h-10 w-10 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-900 flex items-center justify-center flex-col '>
                <FaPhone className=' w-full h-full md:w-7 md:h-7 text-white'/>
            </div>
            <div >
                <h1 className='text-lg sm:text-xl text-white font-bold'>
                    Phone
                </h1>
                <h1 className='text-white text-base sm:text-lg text-opacity-70'>
                    {contactData.phone}
                </h1>
            </div>
        </div>

        <div className='flex items-center space-x-8 mt-8 mb-8'>
            <div className='h-10 w-10 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-900 flex items-center justify-center flex-col '>
                <FaEnvelope className=' w-full h-full md:w-7 md:h-7 text-white'/>
            </div>
            <div >
                <h1 className='text-lg sm:text-xl text-white font-bold'>
                    Email Address
                </h1>
                <h1 className='text-white text-base sm:text-lg text-opacity-70'>
                    {contactData.email}
                </h1>
            </div>
        </div>

        <div className='flex items-center space-x-8 '>
            <div className='h-10 w-10 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-900 flex items-center justify-center flex-col '>
                <FaMap className=' w-full h-full md:w-7 md:h-7 text-white'/>
            </div>
            <div >
                <h1 className='text-lg sm:text-xl text-white font-bold'>
                    Physical Address
                </h1>
                <h1 className='text-white text-base sm:text-lg text-opacity-70'>
                    {contactData.address}
                </h1>
            </div>
        </div>
        
    </div>
  )
}

export default ContactInfo */