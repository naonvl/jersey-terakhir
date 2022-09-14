import cn from 'clsx'
import { useState } from 'react'
import CloseIcon from '@heroicons/react/24/outline/XMarkIcon'
import { SketchPicker as ReactSketchPicker } from 'react-color'

type ColorType = {
  r: number
  g: number
  b: number
  a: number
}

interface SketchPickerProps {
  color: ColorType
}

const SketchPicker: React.FC<SketchPickerProps> = ({ color }) => {
  const [state, setState] = useState({
    displayColorPicker: false,
    color: {
      r: color.r,
      g: color.g,
      b: color.b,
      a: color.a,
    },
  })

  const handleClick = () => {
    return setState({
      ...state,
      displayColorPicker: !state.displayColorPicker,
    })
  }

  const handleClose = () => {
    return setState({
      ...state,
      displayColorPicker: false,
    })
  }

  const handleChange = (color: any) => {
    return setState({
      ...state,
      color: color.rgb,
    })
  }

  const colorClasses = cn('w-[36px] h-[14px] rounded-[2px]')

  return (
    <>
      <div
        className="p-[5px] bg-white rounded-[1px] shadow-[0_0_0_1px_rgba(0,0,0,0.1)] inline-block cursor-pointer"
        onClick={handleClick}
      >
        <div
          className={colorClasses}
          style={{
            background: `rgba(${state.color.r}, ${state.color.g}, ${state.color.b}, ${state.color.a})`,
          }}
        />
      </div>
      {state.displayColorPicker ? (
        <div className="absolute z-[2]">
          <CloseIcon
            className="w-5 h-5 text-gray-700 absolute -right-[1px] -top-[1.15rem] bg-white border border-gray-300 border-b-0 cursor-pointer"
            onClick={handleClose}
          />
          <ReactSketchPicker color={state.color} onChange={handleChange} />
        </div>
      ) : null}
    </>
  )
}

export default SketchPicker
