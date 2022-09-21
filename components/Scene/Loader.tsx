import { Dispatch, SetStateAction, useEffect } from 'react'
import { Html, useProgress } from '@react-three/drei'
import { LayoutFill } from '@components/Image'

interface LoaderProps {
  isLoading: boolean
  dropdownOpen: {
    stepOne: boolean
    stepTwo: boolean
    stepThree: boolean
  }
  setDropdownOpen: Dispatch<
    SetStateAction<{
      stepOne: boolean
      stepTwo: boolean
      stepThree: boolean
    }>
  >
}

function Loader({ isLoading, dropdownOpen, setDropdownOpen }: LoaderProps) {
  const { progress } = useProgress()

  useEffect(() => {
    if (progress === 100 && !isLoading) {
      setDropdownOpen({ ...dropdownOpen, stepOne: true })
    }
  }, [dropdownOpen, isLoading, progress, setDropdownOpen])

  return (
    <Html center>
      <div className="mx-auto inline-flex items-center">
        <LayoutFill
          alt="Cyclists Logo"
          src="/cyclists-logo.webp"
          width={150}
          height={47}
          objectFit="contain"
          quality={60}
        />
      </div>
      {progress} % loaded
    </Html>
  )
}

export default Loader
