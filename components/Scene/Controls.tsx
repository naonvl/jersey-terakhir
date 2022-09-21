import React, { useRef, useEffect } from 'react'
import { extend, useThree, Object3DNode } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: Object3DNode<OrbitControls, typeof OrbitControls>
    }
  }
}

const Controls = () => {
  const ref = useRef<any>(null)
  const { invalidate, camera, gl } = useThree()
  useEffect(() => {
    const refCurrent = ref.current
    refCurrent.addEventListener('change', invalidate)

    return () => {
      refCurrent.removeListener('change', invalidate)
    }
  }, [invalidate])
  return <orbitControls ref={ref} args={[camera, gl.domElement]} />
}
export default Controls
