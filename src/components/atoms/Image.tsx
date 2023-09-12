import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?:boolean
}

const Img: React.FC<ImageProps> = ({ src, alt, className , ...others}) => (
  <Image
    src={src}
    alt={alt}
    width={600}
    height={600}
    className={twMerge(`w-full aspect-auto object-contain `, className)}
    loading={others.priority?'eager' : 'lazy'}
    {...others}
  />
);

export default Img;
