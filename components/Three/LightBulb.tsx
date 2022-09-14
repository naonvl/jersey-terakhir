import { MeshProps } from '@react-three/fiber'

const LightBulb: React.FC<MeshProps> = (props) => {
  return (
    <mesh {...props}>
      <pointLight castShadow />
      <sphereBufferGeometry args={[0.2, 30, 10]} />
      <meshPhongMaterial emissive={'yellow'} />
    </mesh>
  )
}

export default LightBulb
