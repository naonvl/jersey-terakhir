import cn from 'clsx'
import BurgerIcon from '@heroicons/react/24/outline/Bars3Icon'
import SearchIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon'
import SettingIcon from '@heroicons/react/24/outline/Cog6ToothIcon'
import ShoppingBagIcon from '@heroicons/react/24/outline/ShoppingBagIcon'
import LayoutFill from '@components/Image/LayoutFill'
import { Text } from '@components/Text'

interface NavbarProps {
  className?: string
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return (
    <>
      <div className="px-4 lg:px-16 flex lg:hidden gap-2 bg-white">
        <div className="inline-flex items-center">
          <BurgerIcon className="w-6 h-6 text-[#030505]" />
        </div>
        <div className="inline-flex items-center">
          <SearchIcon className="w-5 h-5 text-[#030505]" />
        </div>
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
        <div className="inline-flex items-center">
          <SettingIcon className="w-6 h-6 text-[#030505]" />
        </div>
        <div className="inline-flex items-center">
          <ShoppingBagIcon className="w-6 h-6 text-[#030505]" />
        </div>
      </div>
      <div className="px-4 lg:px-16 gap-2 bg-white hidden lg:flex">
        <div className="w-full flex justify-between">
          <div className="mr-auto inline-flex items-center">
            <LayoutFill
              alt="Cyclists Logo"
              src="/cyclists-logo.webp"
              width={200}
              height={41}
              objectFit="contain"
              quality={60}
            />
          </div>
          <div className="mx-auto inline-flex gap-5 items-center">
            <Text className="font-bold uppercase">jersey collections</Text>
            <Text className="font-bold uppercase">other collections</Text>
            <Text className="font-bold uppercase">casuals</Text>
            <Text className="font-bold uppercase">on sale</Text>
          </div>
          <div className="ml-auto inline-flex gap-4 items-center">
            <SearchIcon className="w-5 h-5 text-[#030505]" />
            <SettingIcon className="w-6 h-6 text-[#030505]" />
            <ShoppingBagIcon className="w-6 h-6 text-[#030505]" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
