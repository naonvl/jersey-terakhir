/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import React, { MutableRefObject, useState, useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { GLTF } from 'three-stdlib'
import { fabric } from 'fabric'
import { useTimer } from 'use-timer'
import initCanvas from '@utils/initCanvas'
import loadSvg from '@utils/loadSvg'

type GLTFResult = GLTF & {
  nodes: {
    M740158_mesh_zipper: THREE.Mesh
    M740158_mesh_band: THREE.Mesh
    M740158_mesh_out: THREE.Mesh
    M740158_mesh_in: THREE.Mesh
    M740158_mesh_zipp: THREE.Mesh
  }
  materials: {
    blinn9: THREE.MeshStandardMaterial
    blinn8: THREE.MeshStandardMaterial
    blinn10: THREE.MeshStandardMaterial
    blinn2: THREE.MeshStandardMaterial
    blinn4: THREE.MeshStandardMaterial
  }
}

interface ShirtProps {
  props?: JSX.IntrinsicElements['group']
}

const width = 512
const height = 512

const Shirt: React.FC<ShirtProps> = ({ props }) => {
  const { gl } = useThree()
  const groupRef = useRef<THREE.Group>(null)
  const canvasRef = useRef<fabric.Canvas | null>(null)
  const texture = useRef<THREE.Texture | null>(null)

  // Textures
  const [normalMap] = useLoader(TextureLoader, ['/textures/Jersey_NORMAL.png'])

  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  const { nodes, materials } = useGLTF('/cycling-jersey.drc.glb') as GLTFResult
  const { start, pause, reset, status } = useTimer()

  useEffect(() => {
    canvasRef.current = initCanvas({
      width,
      height,
    })

    loadSvg({
      path: 2,
      canvas: canvasRef,
      width,
      height,
    })

    start()

    // cleanup
    return () => {
      canvasRef.current?.dispose()
      canvasRef.current = null
    }
  }, [start])

  useFrame((state) => {
    if (canvasRef.current) {
      texture.current = new THREE.Texture(canvasRef.current.getElement())
      texture.current.anisotropy = gl.capabilities.getMaxAnisotropy()
      texture.current.needsUpdate = true
      texture.current.flipY = false

      texture.current.needsUpdate = true
    }

    if (status === 'RUNNING' && groupRef.current) {
      groupRef.current.rotation.y += -0.05
    }

    if (
      groupRef.current &&
      groupRef.current.rotation.y === -6.299999999999986
    ) {
      pause()
      reset()
    }
    state.gl.domElement.style.cursor = hovered ? 'grab' : 'auto'
    state.gl.domElement.style.cursor = clicked ? 'grabbing' : 'grab'
  })

  return (
    <group
      ref={groupRef}
      dispose={null}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={() => setClicked(true)}
      onPointerUp={() => setClicked(false)}
      {...props}
    >
      <mesh
        geometry={nodes.M740158_mesh_zipper.geometry}
        material={materials.blinn9}
        scale={100}
      >
        <meshStandardMaterial
          attach="material"
          normalMap={normalMap}
          normalMap-flipY={false}
          map={texture.current}
        >
          <texture attach="map" image={canvasRef} />
        </meshStandardMaterial>
      </mesh>
      <mesh
        geometry={nodes.M740158_mesh_band.geometry}
        material={materials.blinn8}
        scale={100}
      >
        <meshStandardMaterial
          attach="material"
          normalMap={normalMap}
          normalMap-flipY={false}
          map={texture.current}
        >
          <texture attach="map" image={canvasRef} />
        </meshStandardMaterial>
      </mesh>
      <mesh
        geometry={nodes.M740158_mesh_out.geometry}
        material={materials.blinn10}
        scale={100}
      >
        <meshStandardMaterial
          attach="material"
          normalMap={normalMap}
          normalMap-flipY={false}
          map={texture.current}
        >
          <texture attach="map" image={canvasRef} ref={texture} />
        </meshStandardMaterial>
      </mesh>
      <mesh
        geometry={nodes.M740158_mesh_in.geometry}
        material={materials.blinn2}
        scale={100}
      >
        <meshStandardMaterial
          attach="material"
          normalMap={normalMap}
          normalMap-flipY={false}
          map={texture.current}
        >
          <texture attach="map" image={canvasRef} />
        </meshStandardMaterial>
      </mesh>
      <mesh
        geometry={nodes.M740158_mesh_zipp.geometry}
        material={materials.blinn4}
        scale={100}
      >
        <meshStandardMaterial
          attach="material"
          normalMap={normalMap}
          normalMap-flipY={false}
          map={texture.current}
        >
          <texture attach="map" image={canvasRef} />
        </meshStandardMaterial>
      </mesh>
    </group>
  )
}

useGLTF.preload('/cycling-jersey.drc.glb')

export default Shirt
