import Image, { ImageProps as DefaultImageProps } from 'next/image'

interface ImageProps extends DefaultImageProps {
  alt: string
  src: string
  width: number
  height: number
  quality: number | string
}

const LayoutResponsive = ({
  alt,
  src,
  width = 700,
  height = 475,
  quality = 60,
  ...rest
}: ImageProps) => {
  return (
    <Image
      alt={alt}
      src={src}
      layout="responsive"
      width={width}
      height={height}
      quality={quality}
      {...rest}
    />
  )
}

export default LayoutResponsive
