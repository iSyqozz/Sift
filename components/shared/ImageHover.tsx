'use client'
import Image from 'next/image';

interface ImageHoverProps {
    src: string;
    alt: string;
}

const ImageHover: React.FC<ImageHoverProps> = ({ src, alt }) => {

    const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
        const image = e.currentTarget;
        const boundingBox = image.getBoundingClientRect();
        const centerX = boundingBox.width / 2;
        const centerY = boundingBox.height / 2;
        const x = e.clientX - boundingBox.left;
        const y = e.clientY - boundingBox.top;

        // Calculate the transition values
        const transitionX = (x - centerX) / 10;
        const transitionY = (y - centerY) / 10;

        // Set CSS variables for the transition values
        image.style.setProperty('--transition-x', `${transitionX}px`);
        image.style.setProperty('--transition-y', `${transitionY}px`);
    };

    const resetPosition = (e: React.MouseEvent<HTMLImageElement>) => {
        const image = e.currentTarget;

        // Reset the CSS variables smoothly using a transition
        image.style.setProperty('--transition-x', '0');
        image.style.setProperty('--transition-y', '0');
    };

    return (

        <Image className={'overflow-hidden image-hover w-full aspect-square'}
            onMouseLeave={resetPosition}
            onMouseMove={handleMouseMove}
            width={300}
            height={300}
            alt={alt}
            src={src}
        ></Image>
    );
};

export default ImageHover;