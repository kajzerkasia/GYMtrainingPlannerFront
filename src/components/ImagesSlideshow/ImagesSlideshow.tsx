import {useEffect, useState} from 'react';
import Image from "../Image/Image";
import {SLIDES} from "../../constants/slides";
import classes from './ImagesSlideshow.module.css';

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
        <div className={classes.slideshow}>
            <p className={`${classes.text} ${textVisible ? `${classes.visible}` : `${classes.hidden}`}`}>{SLIDES[currentImageIndex].text}</p>
            {SLIDES.map((slide, index) => (
                <Image
                    key={slide.text}
                    src={SLIDES[currentImageIndex].src}
                    alt="Gym photo"
                    className={index === currentImageIndex ? `${classes.active}` : ''}
                />
            ))}
        </div>
    )
}