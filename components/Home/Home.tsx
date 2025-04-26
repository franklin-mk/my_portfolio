"use client"
import React, { useEffect } from 'react'
import Hero from './Hero/Hero'
import About from './About/About'
import Services from './Services/Services'
import Project from './Project/Project'
import Skills from './Skills/Skills'
import Reviews from './Reviews/Reviews'
import Blog from './Blog/Blog'
import Contact from './Contact/Contact'

import Education from './Education/Education'
import Hobbies from './Hobbies/Hobbies'

import AOS from 'aos';
import 'aos/dist/aos.css';


const Home = () => {
  useEffect(()=>{
    const initAOS = async() => {
      await import('aos')
      AOS.init({
        duration:1000,
        easing:'ease',
        once:true,
        anchorPlacement:'top-bottom'
      })
    } 

    initAOS();
  }, [])



  return (
    <div className="overflow-hidden">
        <div id="home" className="overflow-hidden">
          <Hero />
        </div>

        <div id="about">
          <About />
        </div>

        <div id="services">
          <Services />
        </div>

        <div id="projects">
          <Project />
        </div>

        <div id="education">
          <Education />
        </div>

        <div id="skills">
          <Skills />
        </div>

        <div id="reviews">
          <Reviews />
        </div>

        <div id="hobbies">
          <Hobbies />
        </div>

        <div id="blog">
          <Blog />
        </div>

        <div id="contact">
          <Contact />
        </div>
        

    </div>
  )
}

export default Home