'use client'
import React, { useState } from 'react'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          service: '',
          message: '',
        });
      } else {
        alert('Failed to send message.');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="bg-[#140c1c] rounded-lg p-4 sm:p-10">
      <h1 className="text-bg text-2xl md:text-3xl lg:text-[2.5rem] font-bold">
        Let’s Work Together!
      </h1>
      <p className="text-gray-200 mt-3 lg:text-base text-xs md:text-sm">
        I strive to craft seamless digital experiences that solve real problems and look great doing it.
      </p>
      <form onSubmit={handleSubmit} className="mt-8 block w-full overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
            className="flex-1 bg-black text-white placeholder:text-gray-600 px-6 py-3 rounded-md border-[1.5px] border-gray-200 border-opacity-15 outline-none w-full"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
            className="flex-1 bg-black text-white placeholder:text-gray-600 px-6 py-3 rounded-md border-[1.5px] border-gray-200 border-opacity-15 outline-none w-full"
          />
        </div>
        <div className="flex flex-col mt-5 md:flex-row items-center justify-between gap-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="flex-1 bg-black text-white placeholder:text-gray-600 px-6 py-3 rounded-md border-[1.5px] border-gray-200 border-opacity-15 outline-none w-full"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="flex-1 bg-black text-white placeholder:text-gray-600 px-6 py-3 rounded-md border-[1.5px] border-gray-200 border-opacity-15 outline-none w-full"
          />
        </div>
        <div>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="w-full mt-5 bg-black text-white placeholder:text-gray-600 px-4 py-3.5 rounded-md border-[1.25px] border-gray-200 border-opacity-15 outline-none"
          >
            <option disabled value="">
              Select an Option
            </option>
            <option value="Frontend">
              Frontend Development
            </option>
            <option value="Backend">
              Backend Development
            </option>
            <option value="Full Stack Development">
              Full Stack Development
            </option>
          </select>
        </div>
        <textarea
          rows={7}
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          required
          className="w-full mt-5 bg-black text-white placeholder:text-gray-600 px-4 py-3.5 rounded-md border-[1.25px] border-gray-200 border-opacity-15 outline-none"
        />
        <div className="mt-4">
          <button type="submit" className="px-8 py-3.5 bg-[#7947df] text-white font-bold hover:bg-[#5c2fb7] transition-all duration-150 rounded-full">
            Send Message
          </button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm


/* import React from 'react'

const ContactForm = () => {
  return (
    <div className='bg-[#140c1c] rounded-lg p-4 sm:p-10'>
        <h1 className='text-bg text-2xl md:text-3xl lg:text-[2.5rem] font-bold'>
            Lets Work Together!
        </h1>
        <p className='text-gray-200 mt-3 lg:text-base text-xs md:text-sm'>
            I strive to craft seamless digital experiences that solve real problems and look great doing it.
        </p>
        <form className='mt-8 block w-full overflow-hidden  '>
            <div className='flex flex-col md:flex-row items-center justify-between gap-4 '>
                <input 
                    type="text" 
                    placeholder='First Name' 
                    className=' flex-1 bg-black text-white placeholder:text-gray-600 px-6 py-3 rounded-md border-[1.5px] border-gray-200 border-opacity-15 outline-none w-full '
                />
                <input 
                    type="text" 
                    placeholder='Last Name' 
                    className=' flex-1 bg-black text-white placeholder:text-gray-600 px-6 py-3 rounded-md border-[1.5px] border-gray-200 border-opacity-15 outline-none w-full '
                />
            </div>
            <div className='flex flex-col mt-5 md:flex-row items-center justify-between gap-4 '>
                <input 
                    type="email" 
                    placeholder='Email Address' 
                    className=' flex-1 bg-black text-white placeholder:text-gray-600 px-6 py-3 rounded-md border-[1.5px] border-gray-200 border-opacity-15 outline-none w-full '
                />
                <input 
                    type="text" 
                    placeholder='Phone Number' 
                    className=' flex-1 bg-black text-white placeholder:text-gray-600 px-6 py-3 rounded-md border-[1.5px] border-gray-200 border-opacity-15 outline-none w-full '
                />
            </div>
            <div>
                <select className=' w-full mt-5 bg-black text-white placeholder:text-gray-600 px-4 py-3.5 rounded-md border-[1.25px] border-gray-200 border-opacity-15 outline-none  '>
                    <option disabled selected >
                        Select an Option
                    </option>
                    <option value="Frontend">
                        Frontend Development
                    </option>
                    <option value="Backend">
                        Backend Development
                    </option>
                    <option value="Full Stack Development">
                        Full Stack Development
                    </option>
                </select>
            </div>
            <textarea 
                rows={7} 
                placeholder='Message' 
                className=' w-full mt-5 bg-black text-white placeholder:text-gray-600 px-4 py-3.5 rounded-md border-[1.25px] border-gray-200 border-opacity-15 outline-none  '
            >

            </textarea>
            <div className='mt-4  '>
                <button className='px-8 py-3.5 bg-[#7947df] text-white font-bold hover:bg-[#5c2fb7] transition-all duration-150 rounded-full'>
                    Send Message
                </button>
            </div>
        </form>
    </div>
  )
}

export default ContactForm */