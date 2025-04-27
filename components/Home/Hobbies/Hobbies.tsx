import SectionHeading from '@/components/Helper/SectionHeading'
import { hobbiesData } from '@/Data/data'
import React from 'react'
import HobbyCard from './HobbiesCard'

const Hobbies = () => {
  return (
    <div className="pt-16 pb-16 bg-[#0d0910]">
      <div className="container mx-auto px-4">
        <SectionHeading>
            Hobbies
        </SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-[80%] mx-auto">
          {hobbiesData.map((hobby, i) => {
            return (
              <div 
                key={hobby.id}
                data-aos="fade-up"
                data-aos-delay={`${i*100}`}
                data-aos-duration="800"
                data-aos-easing="ease-in-out"
                className="h-full"
              >
                <HobbyCard hobby={hobby} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Hobbies