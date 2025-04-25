"use client";
import Image from 'next/image';
import React from 'react';

type ServiceProps = {
  service: {
    id: number;
    title: string;
    description: string;
    icon: string;
  };
};

const ServiceCard = ({ service }: ServiceProps) => {
  return (
    <div className='group rounded-xl bg-[#814ced] p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-purple-500/30'>
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm">
        <Image
          src={`${service.icon}`}
          alt={service.title}
          width={50}
          height={50}
          className="object-contain"
        />
      </div>
      <h1 className='mt-4 text-lg font-bold text-white'>{service.title}</h1>
      <p className='mt-2 text-sm text-white text-opacity-80'>
        {service.description}
      </p>
    </div>
  );
};

export default ServiceCard;

/* 
"use client"
import Image from 'next/image';
import React from 'react'
import Tilt from 'react-parallax-tilt';

//define Props
type ServiceProps = {
    service: {
        id: number;
        title: string;
        description: string;
        icon: string;
    }
}
const ServiceCard = ({service}:ServiceProps) => {
  return (
    <Tilt className='shadow-2xl p-6 rounded-lg bg-[#814ced]'>
        <Image
            src={`${service.icon}`}
            alt={service.title}
            width={50}
            height={50}
        />
        <h1 className='mt-4 text-lg font-bold text-gray-100'>
            {service.title}
        </h1>
        <p className='mt-3 text-sm text-white text-opacity-80'>
            {service.description}
        </p>
    </Tilt>
  )
}

export default ServiceCard


*/