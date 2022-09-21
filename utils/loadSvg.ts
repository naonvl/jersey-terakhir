import { Dispatch, MutableRefObject, SetStateAction } from 'react'
import { fabric } from 'fabric'

interface LoadSVGProps {
  path: number
  canvas: MutableRefObject<fabric.Canvas | null>
  width?: number
  height?: number
  setLoading: Dispatch<SetStateAction<boolean>>
}

const loadSvg = ({
  path,
  canvas,
  width = 1024,
  height = 1024,
  setLoading,
}: LoadSVGProps) => {
  fabric.loadSVGFromURL(
    `/textures/Jersey_COLOR${path}.svg`,
    (objects, options) => {
      const svgData = fabric.util.groupSVGElements(objects, {
        width: width,
        height: height,
        selectable: false,
        crossOrigin: 'Anonymous',
      })
      svgData.top = 0
      svgData.left = 0
      console.log(svgData);
      if (canvas.current) {
        canvas.current.add(svgData)
        canvas.current.remove(canvas.current._objects[0])
        canvas.current.sendToBack(svgData)
        canvas.current.renderAll();
        setLoading(false)
      }
    }
  )
}

export default loadSvg
