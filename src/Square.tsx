const Square = ({
  x,
  y,
  z,
  size,
  color,
}: {
  x: number;
  y: number;
  z?: number;
  size: number;
  color: string;
}) => {
  return (
    <group position={[x - 4, z || 0, y - 4]}>
      <mesh>
        <boxBufferGeometry attach="geometry" args={[size, 0, size]} />
        <meshStandardMaterial attach="material" color={color} />
      </mesh>
    </group>
  );
};

export default Square;
