import { MeshProps } from '@react-three/fiber'

const Box: React.FC<MeshProps> = (props) => {
  return (
    <mesh {...props} receiveShadow={true} castShadow={true}>
      <boxBufferGeometry />
      <meshPhysicalMaterial color="white" />
    </mesh>
  )
}

export default Box
