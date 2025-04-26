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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 w-[80%] mx-auto">
          {hobbiesData.map((hobby, i) => {
            return (
              <HobbyCard key={i} hobby={hobby} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Hobbies
//w-[80%] mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 items-center 