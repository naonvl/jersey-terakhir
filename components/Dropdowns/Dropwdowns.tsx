import cn from 'clsx'
import { Fragment, MutableRefObject, MouseEvent } from 'react'
import { Menu, Transition } from '@headlessui/react'
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon'

interface DropdownsProps {
  rootClass?: string
  menuClass?: string
  children?: React.ReactNode | string
  buttonName: string
  onClick: (e: any) => void
  open: boolean
  ref: MutableRefObject<any>
  label: string
}

const Dropdowns: React.FC<DropdownsProps> = ({
  rootClass,
  menuClass,
  children,
  buttonName,
  onClick,
  open,
  ref,
  label,
}) => {
  const rootClasses = cn('relative inline-block text-left', rootClass)
  const menuClasses = cn(
    'right-0 z-10 origin-top-right rounded-md bg-white focus:outline-none',
    menuClass
  )

  return (
    <Menu as="div" className={rootClasses}>
      <div>
        <Menu.Button
          onClick={onClick}
          ref={ref}
          aria-label={label}
          className="inline-flex w-full justify-between uppercase border border-gray-300 bg-black px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-100"
        >
          {buttonName}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
          <div className="p-2">{children}</div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Dropdowns
