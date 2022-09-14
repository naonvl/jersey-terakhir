import { useEffect } from 'react'
import { extend, useThree } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls })

const Controls = () => {
  const { camera, gl } = useThree()
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement)

    return () => {
      controls.dispose()
    }
  }, [camera, gl])
  return null
}
export default Controls
