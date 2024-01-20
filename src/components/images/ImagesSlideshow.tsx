'use client';

import {useEffect, useState} from 'react';
import './ImagesSlideshow.css'

import Image from "../Image/Image";

const slides = [
    {
        src: '/assets/images/gym-1.jpg',
        text: 'Motywacja to klucz do osiągnięcia sukcesu w sporcie i życiu.'
    },
    {
        src: '/assets/images/gym-2.jpg',
        text: 'Trening personalny to odkrywanie potencjału swojego ciała.'
    },
    {
        src: '/assets/images/gym-3.jpg',
        text: 'Siłownia to nie tylko miejsce, to styl życia.'
    },
    {
        src: '/assets/images/gym-4.jpg',
        text: 'Nie ma sukcesu bez wysiłku, nie ma zmiany bez działania.'
    },
    {
        src: '/assets/images/gym-5.jpg',
        text: 'Trening to nie tylko forma, to też stan umysłu.'
    },
];

export default function ImagesSlideshow() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textVisible, setTextVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setTextVisible(false);

            setTimeout(() => {
                setCurrentImageIndex((prevIndex) =>
                    prevIndex < slides.length - 1 ? prevIndex + 1 : 0
                );
                setTextVisible(true);
            }, 500);

        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="slideshow">
            <p className={`text ${textVisible ? 'visible' : 'hidden'}`}>{slides[currentImageIndex].text}</p>
            {slides.map((slide, index) => (
                <>
                    <Image
                        src={slides[currentImageIndex].src}
                        alt="Gym photo"
                        className={index === currentImageIndex ? 'active' : ''}
                    />
                </>
            ))}
        </div>
    )
}