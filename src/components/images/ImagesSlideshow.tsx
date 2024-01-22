import {useEffect, useState} from 'react';
import Image from "../Image/Image";
import {SLIDES} from "../../constants/slides";
import './ImagesSlideshow.css'

export default function ImagesSlideshow() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textVisible, setTextVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setTextVisible(false);

            setTimeout(() => {
                setCurrentImageIndex((prevIndex) =>
                    prevIndex < SLIDES.length - 1 ? prevIndex + 1 : 0
                );
                setTextVisible(true);
            }, 500);

        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="slideshow">
            <p className={`text ${textVisible ? 'visible' : 'hidden'}`}>{SLIDES[currentImageIndex].text}</p>
            {SLIDES.map((slide, index) => (
                <Image
                    key={slide.text}
                    src={SLIDES[currentImageIndex].src}
                    alt="Gym photo"
                    className={index === currentImageIndex ? 'active' : ''}
                />
            ))}
        </div>
    )
}