import React from 'react';

interface ImageProps {
    src: string;
    alt: string;
    className: string;
}

const Image = ({src, alt, className}: ImageProps) => {
    return (
        <img alt={alt} src={src} className={className}/>
    );
};

export default Image;