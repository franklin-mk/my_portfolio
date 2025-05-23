//Blog.tsx WITH ANIMATION
// USE THIS TO ADD THE ANIMATION IN THE EDUCATION SECTION
// WITHOUT CHANGING THE CARD STYLING
import SectionHeading from '@/components/Helper/SectionHeading'
import { blogs } from '@/Data/data'
import React from 'react'
import BlogCard from './BlogCard'

const Blog = () => {
  return (
    <div className='pt-16 pb-16 bg-[#0f0715] '>
        <SectionHeading>
            My Blogs
        </SectionHeading>
        <div className='w-[80%] mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 items-center '>
            {blogs.map((blog, i)=>{
                return (
                    <div 
                        key={blog.id}
                        data-aos="zoom-in"
                        data-aos-delay={`${i*150}`}
                        data-aos-anchor-placement="top-center" 
                    >
                        <BlogCard blog={blog}/>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Blog
