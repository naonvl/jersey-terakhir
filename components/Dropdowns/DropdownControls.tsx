import cn from 'clsx'
import { Fragment, useState, useRef } from 'react'
import { Menu, Transition } from '@headlessui/react'
import ChevronDoubleDownIcon from '@heroicons/react/24/outline/ChevronDoubleDownIcon'
import ChevronDoubleUpIcon from '@heroicons/react/24/outline/ChevronDoubleUpIcon'
import EyeIcon from '@heroicons/react/24/outline/EyeIcon'
import ZoomInIcon from '@heroicons/react/24/outline/MagnifyingGlassPlusIcon'
import ZoomOutIcon from '@heroicons/react/24/outline/MagnifyingGlassMinusIcon'

import { LayoutFill } from '@components/Image'

interface DropdownsProps {
  rootClass?: string
  menuClass?: string
  setZoomIn?: any
  setZoomOut? :any
}

const DropdownControls: React.FC<DropdownsProps> = ({
  rootClass,
  menuClass,
  setZoomIn,
  setZoomOut
}) => {
  const buttonRef = useRef(null)
  const [open, setOpen] = useState<boolean>(true)
  const rootClasses = cn(
    'absolute z-50 top-[8rem] inline-block text-left',
    rootClass
  )
  const menuClasses = cn(
    'absolute right-0 z-10 origin-top-right rounded-md bg-white w-full focus:outline-none',
    menuClass
  )

  return (
    <Menu as="div" className={rootClasses}>
      <div>
        <Menu.Button
          onClick={() => setOpen(!open)}
          ref={buttonRef}
          className="inline-flex items-center justify-between uppercase border border-gray-400 bg-gray-300 px-2 py-2 text-sm font-medium text-black focus:outline-none"
        >
          <EyeIcon className="h-5 w-5" />
          {open ? (
            <ChevronDoubleDownIcon
              className="-mr-1 ml-1 h-3 w-3"
              aria-hidden="true"
            />
          ) : (
            <ChevronDoubleUpIcon
              className="-mr-1 ml-1 h-3 w-3"
              aria-hidden="true"
            />
          )}
        </Menu.Button>
      </div>
      <Transition
        show={open}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className={menuClasses} static>
          <div className="w-full">
            <div onClick={()=> setZoomIn()} className="flex overflow-hidden bg-gray-100 border-b border-l border-r border-gray-400 w-full items-center justify-center cursor-pointer p-2">
              <ZoomInIcon className="h-5 w-5" />
            </div>
            <div onClick={()=> setZoomOut()} className="flex overflow-hidden bg-gray-100 border-b border-l border-r border-gray-400 w-full items-center justify-center cursor-pointer p-2">
              <ZoomOutIcon className="h-5 w-5" />
            </div>
            <div className="flex overflow-hidden bg-gray-100 border-b border-l border-r border-gray-400 w-full items-center justify-center cursor-pointer p-2">
              <LayoutFill
                alt="Cyclists"
                src="/icons/rotate-right.svg"
                width={20}
                height={20}
                objectFit="contain"
                quality={50}
              />
            </div>
            <div className="flex overflow-hidden bg-gray-100 border-b border-l border-r border-gray-400 w-full items-center justify-center cursor-pointer p-2">
              <LayoutFill
                alt="Cyclists"
                src="/icons/rotate-left.svg"
                width={20}
                height={20}
                objectFit="contain"
                quality={50}
              />
            </div>
            <div className="flex overflow-hidden bg-gray-100 border-b border-l border-r border-gray-400 w-full items-center justify-center cursor-pointer p-2">
              <LayoutFill
                alt="Cyclists"
                src="/icons/one-step-back.svg"
                width={20}
                height={20}
                objectFit="contain"
                quality={50}
              />
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default DropdownControls
