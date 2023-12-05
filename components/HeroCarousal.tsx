"use client"

import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

const heroImage = [
    {imageUrl: '/assets/images/hero-1.svg' , alt: ''},
    {imageUrl: '/assets/images/hero-2.svg' , alt: ''},
    {imageUrl: '/assets/images/hero-3.svg' , alt: ''},
    {imageUrl: '/assets/images/hero-4.svg' , alt: ''},
    {imageUrl: '/assets/images/hero-5.svg' , alt: ''},
]


const HeroCarousal = () => {
  return (
    <div className='hero-carousel '>
        <Carousel
            showThumbs = {false}
            autoPlay
            infiniteLoop
            interval={2000}
            showArrows = {false}
            showStatus = {false}
        >
            {heroImage.map((img) => (
                <Image 
                    src={img.imageUrl}
                    alt={img.alt}
                    width={480}
                    height={480}
                    className=' object-contain'
                    key={img.alt}
                />
            ))}
        </Carousel>
        <Image 
            src="/assets/icons/hand-drawn-arrow.svg"
            alt='hand'
            width={175}
            height={175}
            className='max-xl:hidden absolute -left-[15%] bottom-0 z-0'
        />
    </div>
  )
}

export default HeroCarousal