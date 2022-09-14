import Image, { ImageProps as DefaultImageProps } from 'next/image'

interface ImageProps extends DefaultImageProps {
  alt: string
  src: string
  width: number
  height: number
  quality: number | string
}

const LayoutFixed = ({
  alt,
  src,
  width = 300,
  height = 300,
  quality = 60,
  ...rest
}: ImageProps) => {
  return (
    <Image
      alt={alt}
      src={src}
      layout="fixed"
      width={width}
      height={height}
      quality={quality}
      {...rest}
    />
  )
}

export default LayoutFixed
