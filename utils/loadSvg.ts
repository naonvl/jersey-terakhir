import { MutableRefObject } from 'react'
import { fabric } from 'fabric'

interface LoadSVGProps {
  path: number
  canvas: MutableRefObject<fabric.Canvas | null>
  width?: number
  height?: number
}

const loadSvg = ({ path, canvas, width = 512, height = 512 }: LoadSVGProps) => {
  fabric.loadSVGFromURL(
    `/textures/Jersey_COLOR${path}.svg`,
    (objects, options) => {
      const svgData = fabric.util.groupSVGElements(objects, {
        width: width,
        height: height,
        selectable: false,
        crossOrigin: 'anonymous',
      })

      svgData.top = 0
      svgData.left = 0

      if (canvas.current) {
        canvas.current.add(svgData)
        canvas.current.remove(canvas.current._objects[0])
        canvas.current.sendToBack(svgData)
      }
    }
  )
}

export default loadSvg
