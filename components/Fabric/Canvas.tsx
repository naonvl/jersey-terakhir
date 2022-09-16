import { useEffect, useRef, ReactNode } from 'react'
import { fabric } from 'fabric'

const Canvas = () => {
  const canvas = useRef<fabric.Canvas | null>(null)

  useEffect(() => {
    canvas.current = initCanvas()
    // cleanup
    return () => {
      canvas.current?.dispose()
      canvas.current = null
    }
  })

  const initCanvas = () =>
    new fabric.Canvas('canvas', {
      preserveObjectStacking: true,
      height: 600,
      width: 650,
      backgroundColor: '#FFBE9F',
      selection: false,
    })

  return <canvas id="canvas" style={{ display: 'none' }} />
}

export default Canvas
