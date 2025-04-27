import SectionHeading from '@/components/Helper/SectionHeading'
import { educationData } from '@/Data/data'
import React from 'react'
import EducationCard from './EducationCard'

const Education = () => {
  return (
    <div className="pt-16 pb-16 bg-[#0f0715]">
      <div className="container mx-auto px-4">
        <SectionHeading>
            Education
        </SectionHeading>
        <div 
            className="w-[80%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20 mx-auto" 
        >
          {educationData.map((education, i) => {
            return (
                <div 
                  key={education.id}
                  data-aos="zoom-in"
                  data-aos-delay={`${i*150}`}
                  data-aos-anchor-placement="top-center"
                  className="h-full"
                >
                  <EducationCard education={education} />
                </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Education