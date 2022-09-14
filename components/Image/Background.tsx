import Image, { ImageProps as DefaultImageProps } from 'next/image'

interface ImageProps extends DefaultImageProps {
  alt: string
  src: string
  quality: number | string
}

const Background = ({ alt, src, quality = 60, ...rest }: ImageProps) => {
  return (
    <Image
      alt={alt}
      src={src}
      layout="fill"
      objectFit="cover"
      quality={quality}
      {...rest}
    />
  )
}

export default Background
