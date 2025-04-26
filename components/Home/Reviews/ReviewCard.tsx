import Image from 'next/image';
import React from 'react'
import { FaStar } from 'react-icons/fa';

//types definition
type ReviewProps = {
    review: {
        name: string;
        review: string;
        rating: number;
        profession: string;
        image: string;
    }
}

const ReviewCard = ({review}: ReviewProps) => {
    const {image, name, profession, review: clientReview, rating} = review
  return (
    <div className='rounded-md overflow-hidden bg-[#140c1c] m-2 h-full flex flex-col'>
        <div className='p-6 flex-1 flex flex-col'>
            <Image 
                src="/images/q.png"
                alt='quote'
                width={50}
                height={50}
            />
            <p className='text-white text-opacity-70 my-4 flex-1 line-clamp-6'>
                {clientReview}
            </p>
            <Image 
                src="/images/q.png"
                alt='quote'
                width={50}
                height={50}
                className='ml-auto transform rotate-180'
            />
        </div>
        <div className='px-6 py-3 mb-3 w-fit mx-auto rounded-full flex items-center space-x-3 bg-indigo-900 text-white font-bold'>
            <span>
                {rating}/5
            </span>
            <FaStar className='text-yellow-400'/>
        </div>
        <div className='bg-gray-100 mt-auto'>
            <div className='p-6 items-center flex space-x-6'>
                <div>
                    <Image 
                        src={image}
                        alt={name}
                        width={40}
                        height={40}
                        className='rounded-full object-cover'
                    />
                </div>
                <div>
                    <h1 className='text-lg font-bold'>{name}</h1>
                    <p className='text-base text-gray-700'>{profession}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ReviewCard


/* import Image from 'next/image';
import React from 'react'
import { FaStar } from 'react-icons/fa';
//types definition
type ReviewProps = {
    review: {
        name: string;
        review: string;
        rating: number;
        profession: string;
        image: string;
    }
}
const ReviewCard = ({review}: ReviewProps) => {
    const {image, name, profession, review: clientReview, rating} = review
  return (
    <div className='rounded-md overflow-hidden bg-[#140c1c] m-4'>
        <div className='p-6'>
            <Image 
                src="/images/q.png"
                alt='image'
                width={50}
                height={50}
            />
            <p className='text-white text-opacity-70'>
                {clientReview}
            </p>
            <Image 
                src="/images/q.png"
                alt='image'
                width={50}
                height={50}
                className='ml-auto'
            />
        </div>
        <div className='px-6 py-3 mb-3 w-fit mx-auto rounded-full flex items-center space-x-3 bg-indigo-900 text-white font-bold'>
            <span>
                {rating}/5
            </span>
            <FaStar className='text-yellow-400'/>
        </div>
        <div className='bg-gray-100 '>
            <div className='p-6 items-center flex space-x-6'>
                <div>
                    <Image 
                        src={image}
                        alt='name'
                        width={40}
                        height={40}
                        className='rounded-full'
                    />
                </div>
                <div>
                    <h1 className='text-lg font-bold'>{name}</h1>
                    <p className='text-base text-gray-700'>{profession}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ReviewCard */