import Image from 'next/image';
import React from 'react'
import { FaGraduationCap, FaCalendarAlt, FaTrophy } from 'react-icons/fa';

type educationProps = {
  education: {
    id: number;
    institution: string;
    program: string;
    duration: string;
    image: string;
    keyAchievements: string[];
  }
}

const EducationCard = ({education}: educationProps) => {
  const {institution, program, duration, image, keyAchievements} = education
  
  return (
    <div className="bg-indigo-950 rounded-lg shadow-md overflow-hidden text-white h-full flex flex-col">
      <div className="relative w-full">
        <Image 
          src={image} 
          alt={institution}
          width={300}
          height={300}
          className='w-full h-[300px] object-cover'
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex flex-row items-center gap-2 mb-4">
          <FaGraduationCap className="text-2xl flex-shrink-0" />
          <h3 className="text-xl font-medium">{institution}</h3>
        </div>

        <p className="text-sm font-bold mb-3">{program}</p>
        
        <div className="flex items-center gap-2 mb-4">
          <FaCalendarAlt className="text-sm flex-shrink-0" />
          <p className="text-sm">{duration}</p>
        </div>
        
        <div className="mt-4 flex-grow">
          <div className="flex items-center gap-2 mb-2">
            <FaTrophy className="text-lg flex-shrink-0" />
            <p className="font-medium">Key Achievements:</p>
          </div>
          <ul className="list-disc pl-7 space-y-1">
            {keyAchievements.map((achievement, index) => (
              <li key={index} className="text-sm text-gray-300">{achievement}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default EducationCard