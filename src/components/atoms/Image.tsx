import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

const Img: React.FC<ImageProps> = ({ src, alt, className }) => (
  <Image
    src={src}
    alt={alt}
    width={600}
    height={600}
    className={twMerge(`w-full aspect-auto object-contain`,className)}
    loading="lazy"
  />
);

export default Img;
