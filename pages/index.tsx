import cn from 'clsx'
import {
  useState,
  useRef,
  MouseEvent,
  useEffect,
  Suspense,
  useLayoutEffect,
  Dispatch,
  MutableRefObject,
  SetStateAction,
} from 'react'
import Head from 'next/head'
import type { NextPage } from 'next'
import { Text } from '@components/Text'
import { Navbar } from '@components/Nav'
import { Dropdowns, DropdownControls } from '@components/Dropdowns'
import { LayoutFill } from '@components/Image'
import { SketchPicker } from '@components/ColorPicker'
import { Select } from '@components/Input'
import InputNumber from '@components/Input/InputNumber'
import {
  Canvas as ThreeCanvas,
  useFrame,
  extend,
  useThree,
} from '@react-three/fiber'
import {
  SpotLight,
  OrbitControls,
  Environment,
  Stats,
  AdaptiveDpr,
} from '@react-three/drei'
import ArrowDownTrayIcon from '@heroicons/react/24/outline/ArrowDownTrayIcon'
import { Shirt } from '@components/Objects'
import Loader from '@components/Scene/Loader'
import { fabric } from 'fabric'
extend({ OrbitControls })
const jerseyStyles = [
  {
    text: 'Champion',
    image: '/thumbnails/champion_front_2022.jpg',
  },
  {
    text: 'Simple',
    image: '/thumbnails/simple_front_2022.jpg',
  },
  {
    text: 'Climber',
    image: '/thumbnails/climber_front_2022.jpg',
  },
  {
    text: 'Bubbles',
    image: '/thumbnails/bubbles_front_2022.jpg',
  },
]

const options = [
  {
    value: 'roboto',
    text: 'Roboto',
  },
]
const colors: any[] = []
const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const {
    camera,
    gl: { domElement },
  } = useThree()
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls: any = useRef()
  useFrame((state) => controls.current.update())
  return <orbitControls ref={controls} args={[camera, domElement]} />
}
const Dolly = ({
  isObjectFront,
  cameraChanged,
  setCameraChanged,
  zoomIn,
  zoomOut,
}: {
  isObjectFront: boolean
  cameraChanged: boolean
  setCameraChanged: any
  zoomIn: any
  zoomOut: any
}) => {
  useFrame((state) => {
    if (zoomIn && cameraChanged) {
      state.camera.zoom = zoomIn
      state.camera.updateProjectionMatrix()
      setCameraChanged(false)
    }
    // if (zoomOut && cameraChanged) {
    //   state.camera.zoom = zoomOut
    //   state.camera.updateProjectionMatrix()
    //   setCameraChanged(false)
    // }
    if (!isObjectFront && cameraChanged) {
      state.camera.position.z = -500
      setCameraChanged(false)
    }

    if (isObjectFront && cameraChanged) {
      state.camera.position.z = 500
      setCameraChanged(false)
    }
  })

  return null
}
interface SvgData {
  id: string
  color: string
}
interface LoadSVGProps {
  path: number
  canvas: MutableRefObject<fabric.Canvas | null>
  width?: number
  height?: number
  setLoading: Dispatch<SetStateAction<boolean>>
}
const Home: NextPage = () => {
  const inputNumberRef = useRef<HTMLInputElement>(null)
  const [step, setStep] = useState(1)
  const [order, setOrder] = useState(1)
  const [width, setWidth] = useState<number>(1400)
  const canvasRef = useRef<fabric.Canvas | null>(null)
  const [texturePath, setTexturePath] = useState(1)
  const [zoomIn, setZoomIn] = useState(1)
  const [zoomOut, setZoomOut] = useState(1)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [svgLoading, setSvgLoading] = useState<boolean>(true)
  const [isObjectFront, setIsObjectFront] = useState<boolean>(true)
  const [cameraChanged, setCameraChanged] = useState<boolean>(false)
  const [colorList, setColorList] = useState<SvgData | null>(null)
  const [svgGroup, setSvgGroup]: any = useState([])
  const loadSvg = (path: number) => {
    console.log('s')

    fabric.loadSVGFromURL(
      `/textures/Jersey_COLOR${path}.svg`,
      (objects, options) => {
        const svgData = fabric.util.groupSVGElements(objects, {
          width: 1024,
          height: 1024,
          selectable: false,
          crossOrigin: 'anonymous',
        }) as any
        svgData.top = 0
        svgData.left = 0
        setSvgGroup(svgData)
        initColors(svgData._objects)
        console.log()
        if (canvasRef.current) {
          if (canvasRef.current._objects[0] != undefined) {
            canvasRef.current.remove(canvasRef.current._objects[0])
          }
          canvasRef.current.add(svgData)
          canvasRef.current.sendToBack(svgData)
          canvasRef.current.renderAll()
          setSvgLoading(false)
        }
      }
    )
  }
  const initColors = (svgData: any) => {
    for (let i = 0; i < svgData.length; i++) {
      // colors.push({
      //   id: svgData[i].id,
      //   color: svgData[i].fill,
      // })
      colors[i] = {
        id: svgData[i].id,
        color: svgData[i].fill,
      }
    }
    console.log(colors)
  }
  const initCanvas = () =>
    new fabric.Canvas('canvas', {
      preserveObjectStacking: true,
      width: 1024,
      height: 1024,
      selection: false,
    })
  const [dropdownOpen, setDropdownOpen] = useState({
    stepOne: false,
    stepTwo: false,
    stepThree: false,
  })
  const [addStep, setAddStep] = useState({
    name: '',
    fontSize: 16,
    fontFamily: 'Roboto',
  })
  useEffect(() => {
    setWidth(window.innerWidth)
    // setTimeout(() => {
    //   setSvgLoading(false)
    // }, 2500);
    console.log(width)
    loadSvg(1)
    canvasRef.current = initCanvas()
    // cleanup
    return () => {
      canvasRef.current?.dispose()
      canvasRef.current = null
    }
  }, [])
  useEffect(() => {
    switch (step) {
      case 1:
        return setDropdownOpen({
          stepOne: true,
          stepTwo: false,
          stepThree: false,
        })
      case 2:
        return setDropdownOpen({
          stepOne: false,
          stepTwo: true,
          stepThree: false,
        })
      case 3:
        return setDropdownOpen({
          stepOne: false,
          stepTwo: false,
          stepThree: true,
        })

      default:
        return setDropdownOpen({
          stepOne: true,
          stepTwo: false,
          stepThree: false,
        })
    }
  }, [step])

  const handleChangeTexture = (index: number) => {
    setTexturePath(index + 1)
    loadSvg(index + 1)
  }

  const handleViewCamera = () => {
    setIsObjectFront(!isObjectFront)
    setCameraChanged(true)
  }
  const handleZoomIn = () => {
    setZoomIn(zoomIn + 0.3)
    setCameraChanged(true)
  }
  const handleZoomOut = () => {
    setZoomIn(zoomIn - 0.1)
    setCameraChanged(true)
  }
  const decrementAction = () => {
    if (order == 1) {
      return setOrder(1)
    }

    return setOrder(order - 1)
  }

  const incrementAction = () => {
    return setOrder(order + 1)
  }

  const handleChange = (e: any) => {
    setAddStep({ ...addStep, [e.target.name]: e.target.value })
  }

  const handlePrev = () => {
    if (step == 1) {
      return setStep(1)
    }

    setStep(step - 1)
  }

  const handleNext = () => {
    if (step == 3) {
      return setStep(3)
    }

    setStep(step + 1)
  }

  const handleOpen = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const label: string | null = e.currentTarget.ariaLabel

    if (label === null) return null

    switch (label) {
      case 'stepOne':
        return setStep(1)
      case 'stepTwo':
        return setStep(2)
      case 'stepThree':
        return setStep(3)
      default:
        return setStep(1)
    }
  }

  return (
    <>
      <Head>
        <title>Cyclists</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=Chivo"
          rel="stylesheet"
        />
      </Head>

      <Navbar />

      <div className="bg-[#f9f9f9] py-2 px-4 lg:px-16 lg:py-4">
        <Text className="text-xs">
          Home | Jersey Customiser. Your jersey just the way you want it.
        </Text>
      </div>

      <div className="flex px-2 lg:px-16 flex-col lg:flex-row max-w-[1400px] mx-auto">
        <div className="lg:w-1/2">
          {/* Mobile */}
          <div className="my-5 lg:hidden">
            <Suspense fallback={<span>loading...</span>}>
              <ThreeCanvas
                frameloop="demand"
                performance={{ min: 0.1, max: 0.3 }}
                camera={{ position: [0, 0, 500], fov: 30 }}
                style={{
                  // width: '596px',
                  height: '400px',
                }}
                id="rendered"
              >
                <ambientLight intensity={1} />
                <spotLight
                  intensity={1}
                  angle={0.3}
                  penumbra={1}
                  position={[10, 50, 50]}
                  castShadow
                />
                <spotLight
                  intensity={1}
                  angle={0.3}
                  penumbra={1}
                  position={[10, 50, -50]}
                  castShadow
                />
                <Suspense
                  fallback={
                    <Loader
                      dropdownOpen={dropdownOpen}
                      setDropdownOpen={setDropdownOpen}
                      isLoading={isLoading}
                    />
                  }
                >
                  {svgLoading ? (
                    <span>loading...</span>
                  ) : (
                    <Shirt canvasRef={canvasRef} setLoading={setLoading} />
                  )}
                  <Environment preset="city" />
                </Suspense>
                <OrbitControls
                  minPolarAngle={Math.PI / 4}
                  maxPolarAngle={Math.PI / 1.4}
                  minDistance={20}
                  minZoom={20}
                  maxDistance={90}
                  maxZoom={90}
                  enableZoom={true}
                  enablePan={false}
                />
                <Dolly
                  isObjectFront={isObjectFront}
                  cameraChanged={cameraChanged}
                  setCameraChanged={setCameraChanged}
                  zoomIn={zoomIn}
                  zoomOut={zoomOut}
                />
                <AdaptiveDpr />
                <Stats showPanel={0} />
              </ThreeCanvas>
            </Suspense>
          </div>

          <div className="mb-3 mt-5">
            <div className="flex overflow-hidden md:justify-between">
              <div
                onClick={(e: any) => setStep(1)}
                className="inline-flex flex-col items-center"
                style={{ cursor: 'pointer' }}
              >
                <Text
                  className={cn(
                    'text-2xl lg:text-3xl font-bold w-full mr-auto',
                    {
                      ['text-pink-600']: step == 1,
                    }
                  )}
                >
                  Step 1
                </Text>
                <Text
                  className={cn('text-xs uppercase', {
                    ['text-pink-600']: step == 1,
                  })}
                >
                  choose your style
                </Text>
              </div>
              <div
                onClick={(e: any) => setStep(2)}
                className="inline-flex flex-col items-center"
                style={{ cursor: 'pointer' }}
              >
                <Text
                  className={cn(
                    'text-2xl lg:text-3xl font-bold w-full mr-auto',
                    {
                      ['text-pink-600']: step == 2,
                    }
                  )}
                >
                  Step 2
                </Text>
                <Text
                  className={cn('text-xs uppercase', {
                    ['text-pink-600']: step == 2,
                  })}
                >
                  choose your colours
                </Text>
              </div>
              <div
                onClick={(e: any) => setStep(3)}
                className="inline-flex flex-col items-center"
                style={{ cursor: 'pointer' }}
              >
                <Text
                  className={cn(
                    'text-2xl lg:text-3xl font-bold w-full mr-auto',
                    {
                      ['text-pink-600']: step == 3,
                    }
                  )}
                >
                  Step 3
                </Text>
                <Text
                  className={cn('text-xs uppercase', {
                    ['text-pink-600']: step == 3,
                  })}
                >
                  add text [If you want]
                </Text>
              </div>
            </div>
          </div>

          <div className="my-5">
            <Dropdowns
              onClick={(e: any) => handleOpen(e)}
              open={dropdownOpen.stepOne}
              buttonName="Choose your style"
              rootClass="w-full"
              menuClass="w-full"
              label="stepOne"
            >
              <div className="flex overflow-hidden">
                {jerseyStyles.map(({ text, image }, index) => (
                  <div
                    // className={
                    //   cn('cursor-pointer w-full justify-center items-center'),
                    //   {
                    //     ['border border-pink-600']: texturePath === index + 1,
                    //   }
                    // }
                    className={cn(
                      'cursor-pointer w-full justify-center items-center  hover:border hover:border-pink-600',
                      {
                        ['border border-pink-600']: texturePath === index + 1,
                      }
                    )}
                    onClick={() => {
                      handleChangeTexture(index)
                    }}
                    key={index}
                  >
                    <LayoutFill
                      alt={text}
                      src={image}
                      objectFit="contain"
                      width="100%"
                      height={95}
                      quality={60}
                      style={{
                        maxWidth: '177px',
                      }}
                    />
                    <button
                      type="button"
                      className={cn(
                        'w-full h-[3.5rem] px-3 text-sm font-bold text-center py-2 uppercase text-black my-2'
                      )}
                    >
                      {text}
                    </button>
                  </div>
                ))}
              </div>
            </Dropdowns>

            <Dropdowns
              onClick={(e: any) => handleOpen(e)}
              open={dropdownOpen.stepTwo}
              buttonName="Choose your colours"
              rootClass="w-full"
              menuClass="w-full"
              label="stepTwo"
            >
              {/* <div className="flex flex-col overflow-hidden">
                <div className="inline-flex w-full justify-between items-center">
                  <SketchPicker color={{ r: 241, g: 19, b: 127, a: 100 }} />
                  <Text className="font-bold text-gray-600">
                    Main Colour or{' '}
                    <span className="underline cursor-pointer">
                      Choose Pattern
                    </span>
                  </Text>
                  <LayoutFill
                    alt="Cyclist Cusotm Jersey"
                    src="/kein-muster.svg"
                    width="100%"
                    height={35}
                    style={{
                      maxWidth: '60px',
                    }}
                    objectFit="contain"
                    quality={60}
                  />
                </div>

                <div className="inline-flex w-full justify-between items-center">
                  <SketchPicker color={{ r: 19, g: 218, b: 127, a: 100 }} />
                  <Text className="font-bold text-gray-600">
                    2nd Colour or{' '}
                    <span className="underline cursor-pointer">
                      Choose Pattern
                    </span>
                  </Text>
                  <LayoutFill
                    alt="Cyclist Cusotm Jersey"
                    src="/kein-muster.svg"
                    width="100%"
                    height={35}
                    style={{
                      maxWidth: '60px',
                    }}
                    objectFit="contain"
                    quality={60}
                  />
                </div>

                <div className="inline-flex w-full justify-between items-center">
                  <SketchPicker color={{ r: 241, g: 19, b: 19, a: 100 }} />
                  <Text className="font-bold text-gray-600">
                    3rd Colour or{' '}
                    <span className="underline cursor-pointer">
                      Choose Pattern
                    </span>
                  </Text>
                  <LayoutFill
                    alt="Cyclist Cusotm Jersey"
                    src="/kein-muster.svg"
                    width="100%"
                    height={35}
                    style={{
                      maxWidth: '60px',
                    }}
                    objectFit="contain"
                    quality={60}
                  />
                </div>

                <div className="inline-flex w-full justify-between items-center">
                  <SketchPicker color={{ r: 19, g: 241, b: 55, a: 100 }} />
                  <Text className="font-bold text-gray-600">
                    4th Colour or{' '}
                    <span className="underline cursor-pointer">
                      Choose Pattern
                    </span>
                  </Text>
                  <LayoutFill
                    alt="Cyclist Cusotm Jersey"
                    src="/kein-muster.svg"
                    width="100%"
                    height={35}
                    style={{
                      maxWidth: '60px',
                    }}
                    objectFit="contain"
                    quality={60}
                  />
                </div>

                <div className="inline-flex w-full justify-between items-center">
                  <SketchPicker color={{ r: 255, g: 160, b: 0, a: 100 }} />
                  <Text className="font-bold text-gray-600">
                    Collar Colour or{' '}
                    <span className="underline cursor-pointer">
                      Choose Pattern
                    </span>
                  </Text>
                  <LayoutFill
                    alt="Cyclist Cusotm Jersey"
                    src="/kein-muster.svg"
                    width="100%"
                    height={35}
                    style={{
                      maxWidth: '60px',
                    }}
                    objectFit="contain"
                    quality={60}
                  />
                </div>
              </div> */}
              <div className="flex flex-col overflow-hidden">
                {colors.map((data, index) => (
                  <div
                    key={index}
                    className="inline-flex w-full justify-between items-center"
                  >
                    <SketchPicker
                      color={data.color}
                      setCurrentColor={(e: string) => {
                        svgGroup._objects[index].set('fill', e)
                        canvasRef.current?.renderAll()
                      }}
                    />
                    <Text className="font-bold text-gray-600">
                      {data.id} or{' '}
                      <span className="underline cursor-pointer">
                        Choose Pattern
                      </span>
                    </Text>
                    <LayoutFill
                      alt="Cyclist Cusotm Jersey"
                      src="/kein-muster.svg"
                      width="100%"
                      height={35}
                      style={{
                        maxWidth: '60px',
                      }}
                      objectFit="contain"
                      quality={60}
                    />
                  </div>
                ))}
              </div>
            </Dropdowns>

            <Dropdowns
              onClick={(e: any) => handleOpen(e)}
              open={dropdownOpen.stepThree}
              buttonName="Add text"
              rootClass="w-full"
              menuClass="w-full"
              label="stepThree"
            >
              <div className="flex flex-col overflow-hidden">
                <div className="inline-flex flex-col mb-2">
                  <label
                    htmlFor="addName"
                    className="text-gray-700 font-bold mb-1"
                  >
                    Enter the name you want to add
                  </label>
                  <input
                    id="addName"
                    type="text"
                    className="border border-black placeholder:text-gray-700 text-black px-3 py-2 focus:border-pink-500 focus:ring-pink-500"
                    onChange={handleChange}
                    placeholder="Type your name"
                    name="name"
                    value={addStep.name}
                  />
                </div>
                <div className="inline-flex flex-col mb-3">
                  <label
                    htmlFor="fontSize"
                    className="text-gray-700 font-bold mb-1"
                  >
                    Font Size
                  </label>
                  <input
                    id="fontSize"
                    type="range"
                    step="1"
                    min="1"
                    max="75"
                    name="fontSize"
                    value={addStep.fontSize}
                    onChange={handleChange}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg"
                  ></input>
                </div>
                <div className="inline-flex flex-col mb-5">
                  <Select
                    name="fontFamily"
                    value={addStep.fontFamily}
                    defaultValue="Roboto"
                    defaultOption="Choose your font"
                    label="Font"
                    id="fontFamily"
                    options={options}
                  />
                </div>
              </div>
            </Dropdowns>
          </div>

          <div className="my-3">
            <div
              className="bg-pink-200 p-3"
              style={{ marginTop: '50px', marginBottom: '50px' }}
            >
              <Text className="font-bold uppercase text-xs text-black">
                Need a custom design for your club, company or team? we can give
                you exactly what you need with no minimum order and quick
                turnaround time.{' '}
                <span className="text-pink-500">just contact us</span>.
              </Text>
            </div>
          </div>

          <div className="my-2">
            <div className="flex justify-between">
              <button
                type="button"
                className={cn(
                  'text-center py-3 px-6 lg:py-2 lg:px-8 uppercase text-sm hover:border hover:border-black hover:bg-white hover:text-black',
                  {
                    ['border border-black bg-white text-black']:
                      dropdownOpen.stepOne,
                  },
                  {
                    ['bg-pink-600 border border-pink-600 text-white']:
                      dropdownOpen.stepTwo || dropdownOpen.stepThree,
                  }
                )}
                onClick={handlePrev}
              >
                prev
              </button>
              <button
                type="button"
                className={cn(
                  'text-center py-3 px-6 lg:py-2 lg:px-8 uppercase text-sm hover:border hover:border-black hover:bg-white hover:text-black',
                  {
                    ['border border-black bg-white text-black']:
                      dropdownOpen.stepThree,
                  },
                  {
                    ['bg-pink-600 border border-pink-600 text-white']:
                      dropdownOpen.stepOne || dropdownOpen.stepTwo,
                  }
                )}
                onClick={handleNext}
              >
                next
              </button>
            </div>
          </div>

          <div className="my-7 w-full flex flex-col md:flex-row md:gap-4">
            <InputNumber
              id="totalOrder"
              name="numberOfPeople"
              onChange={handleChange}
              value={order}
              min={1}
              decrementAction={decrementAction}
              incrementAction={incrementAction}
              count={order}
              ref={inputNumberRef}
            />
            <button
              type="button"
              className={cn(
                'w-full h-[3.5rem] px-4 text-center py-3 uppercase bg-pink-600 border border-pink-600 text-white my-2 hover:border hover:border-black hover:bg-white hover:text-black'
              )}
            >
              add to cart
            </button>
          </div>
        </div>
        <div className="mx-5 lg:w-1/2 hidden lg:block">
          <div className="relative">
            <DropdownControls setZoomIn={handleZoomIn} />
          </div>
          <div className="relative">
            <button
              type="button"
              className="cursor-pointer uppercase font-bold bg-white text-sm text-gray-800 absolute top-[1rem] left-[4rem] z-30"
              onClick={handleViewCamera}
            >
              view {isObjectFront ? 'back' : 'front'}
            </button>

            <button
              type="button"
              className="cursor-pointer uppercase font-bold bg-white text-sm text-gray-800 inline-flex gap-1 absolute top-[1rem] right-[4rem] z-30"
            >
              <ArrowDownTrayIcon className="h-5 w-5 text-gray-800" />
              <span>save</span>
            </button>
          </div>
          <Suspense fallback={<span>loading...</span>}>
            <ThreeCanvas
              frameloop="demand"
              performance={{ min: 0.1, max: 0.3 }}
              camera={{ position: [0, 0, 500], fov: 30 }}
              style={{
                width: '596px',
                height: '599px',
              }}
              id="rendered"
            >
              <ambientLight intensity={1} />
              <spotLight
                intensity={1}
                angle={0.3}
                penumbra={1}
                position={[10, 50, 50]}
                castShadow
              />
              <spotLight
                intensity={1}
                angle={0.3}
                penumbra={1}
                position={[10, 50, -50]}
                castShadow
              />
              <Suspense
                fallback={
                  <Loader
                    dropdownOpen={dropdownOpen}
                    setDropdownOpen={setDropdownOpen}
                    isLoading={isLoading}
                  />
                }
              >
                {svgLoading ? (
                  <span>loading...</span>
                ) : (
                  <Shirt canvasRef={canvasRef} setLoading={setLoading} />
                )}
                <Environment preset="city" />
              </Suspense>

              <OrbitControls
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.4}
                minDistance={20}
                minZoom={20}
                maxDistance={90}
                maxZoom={90}
                enableZoom={true}
                enablePan={false}
              />
              <Dolly
                isObjectFront={isObjectFront}
                cameraChanged={cameraChanged}
                setCameraChanged={setCameraChanged}
                zoomIn={zoomIn}
                zoomOut={zoomOut}
              />
              <AdaptiveDpr />
              <Stats showPanel={0} />
            </ThreeCanvas>
          </Suspense>
          <div
            className="flex"
            style={{ alignContent: 'center', justifyContent: 'center' }}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDI_3HAdsHWcd81rxQzF4K5Ti7JsTlNR0IMkqCZjiJwQqObnAf30OqgYRtY3pWGelQO3A&usqp=CAU"
              width={50}
              alt=""
              style={{ height: '30px' }}
            />
            <div
              className="flex"
              style={{ alignContent: 'center', marginLeft: '50px' }}
            >
              <img src="/faq-icon.jpg" width={40} alt="" />
              <span
                style={{
                  fontSize: '14px',
                  marginLeft: '10px',
                  lineHeight: '2.5',
                }}
              >
                Do you have question ?
              </span>
            </div>
          </div>
          <h4
            style={{
              fontSize: '24px',
              fontWeight: '600',
              textAlign: 'center',
              marginTop: '25px',
            }}
          >
            £51.99 | Save £13.00 (
            <span style={{ color: '#cc0000 !important' }}>25% off</span>)
          </h4>
        </div>
      </div>
      <canvas id="canvas" style={{ display: 'none' }} />
    </>
  )
}

export default Home
