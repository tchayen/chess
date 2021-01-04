import Square from "./Square";

const Chessboard = () => {
  console.log("Chessboard");
  const fields = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <>
      {fields.map((x) =>
        fields.map((y) => (
          <Square
            key={`(${x},${y})`}
            x={x}
            y={y}
            size={1}
            color={(x + y) % 2 === 0 ? "#333" : "#888"}
          />
        ))
      )}
    </>
  );
};

export default Chessboard;
