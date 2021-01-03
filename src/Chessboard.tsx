const Chessboard = () => {
  const fields = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <>
      {fields.map((x) =>
        fields.map((y) => (
          <group key={`(${x},${y})`} position={[x - 4, 0, y - 4]}>
            <mesh>
              <boxBufferGeometry attach="geometry" args={[1, 0, 1]} />
              <meshStandardMaterial
                attach="material"
                color={(x + y) % 2 === 0 ? "#333" : "#888"}
              />
            </mesh>
          </group>
        ))
      )}
    </>
  );
};

export default Chessboard;
