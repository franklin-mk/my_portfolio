import { BaseInfo } from '@/Data/data'
import Image from 'next/image'
import React from 'react'
import { FaDownload } from 'react-icons/fa'

const Hero = () => {
  // Function to handle CV download
  const handleDownloadCV = () => {
    // Create an anchor element
    const link = document.createElement('a');
    // Set the href to the CV PDF file path
    link.href = BaseInfo.cvpdf;
    // Set download attribute with the file name
    link.download = `${BaseInfo.name}_CV.pdf`;
    // Append to the document
    document.body.appendChild(link);
    // Trigger the click event
    link.click();
    // Clean up
    document.body.removeChild(link);
  };

  return (
    <div className="w-full pt-[4vh] md:pt-[12vh] h-screen bg-[#0f0715] overflow-hidden relative">
        <div className='flex justify-center flex-col w-4/5 h-full mx-auto'>
            <div className='grid grid-cols-1 lg:grid-cols-2 items-center gap-8'>
                {/* CONTENT */}
                <div>
                    {/* NAME */}
                    <h1 
                        data-aos="fade-left" 
                        className='text-2xl md:text-3xl lg:text-4xl mb-5 text-gray-300 font-semibold'
                    >
                        I am {BaseInfo.name}
                    </h1>
                    {/* TITLE POSITION */}
                    <h1 
                        data-aos="fade-right"
                        data-aos-delay="100"
                        className='text-bg text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold md:leading=[3rem] lg:leading=[3.5rem] xl:leading-[4rem] text-white'>
                        {BaseInfo.position}
                    </h1>
                    {/* DESCRIPTION */}
                    <p 
                        className='mt-6 text-sm md:text-base text-white text-opacity-60'
                        data-aos="fade-left"
                        data-aos-delay="200"
                    >
                        {BaseInfo.description}
                    </p>
                    {/* DOWNLOAD CV BUTTON */}
                    <button 
                        onClick={handleDownloadCV}
                        className='md:px-8 md:py-2.5 px-6 py-1.5 text-white font-semibold text-sm md:text-lg transition-all duration-200 rounded-lg mt-8 bg-blue-700 hover:bg-red-950 flex items-center space-x-2'
                        data-aos="zoom-in"
                        data-aos-delay="300"
                    >
                        <span>
                            Download CV
                        </span>
                        <FaDownload />
                    </button>
                </div>

                {/* IMAGE - Now visible on all screen sizes */}
                <div 
                    className='mx-auto mt-6 lg:mt-0 rounded-[2rem] md:rounded-[3rem] border-[3.5px] border-blue-950 overflow-hidden shadow-glow relative'
                    data-aos="zoom-in"
                    data-aos-delay="400"
                    style={{
                        boxShadow: '0 0 25px rgba(30, 64, 175, 0.4)'
                    }}
                >
                    <Image 
                        src={BaseInfo.profilePic} 
                        alt={BaseInfo.name} 
                        width={500} 
                        height={500}
                        className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover"
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero