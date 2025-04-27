import Image from 'next/image';
import React from 'react'
import { FaHeart, FaList } from 'react-icons/fa';

type hobbyProps = {
  hobby: {
    id: number;
    hobby: string;
    image: string;
    description: string[];
  }
}

const HobbyCard = ({hobby}: hobbyProps) => {
  const {hobby: hobbyName, image, description} = hobby
  
  return (
    <div className="bg-indigo-950 rounded-lg shadow-md overflow-hidden text-white h-full flex flex-col">
      <div className="relative w-full">
        <Image 
          src={image} 
          alt={hobbyName}
          width={500}
          height={500}
          className='w-full h-[400px] object-cover'
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-4">
          <FaHeart className="text-2xl text-rose-500 flex-shrink-0" />
          <h3 className="text-xl font-bold">{hobbyName}</h3>
        </div>
        
        <div className="mt-4 flex-grow">
          <div className="flex items-center gap-2 mb-2">
            <FaList className="text-lg flex-shrink-0" />
            <p className="font-medium">About this hobby:</p>
          </div>
          <ul className="list-disc pl-7 space-y-1">
            {description.map((item, index) => (
              <li key={index} className="text-sm text-gray-300">{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HobbyCard