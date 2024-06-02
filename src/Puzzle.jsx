import { useState } from "react";

const initialPuzzleArray = [1,2,3,4,null,5,6,7,8,9,10,11,12,13,14,15];

function Puzzle() {
  // the states to store puzzle data
  const [id, setId] = useState(0);
  const [pauseTimeData, setPauseTimeData] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [moves, setMoves] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [puzzle, setPuzzle] = useState(initialPuzzleArray);

  // function to move the puzzle's card
  const moveCard = (index) => {
    const newPuzzle = structuredClone(puzzle);
    if (puzzle[index - 1] === null) {
      if (index % 4 !== 0) {
        newPuzzle[index - 1] = newPuzzle[index];
        newPuzzle[index] = null;
        setMoves((prev) => prev + 1);
      }
    } else if (puzzle[index + 1] === null) {
      if ((index + 1) % 4 !== 0) {
        newPuzzle[index + 1] = newPuzzle[index];
        newPuzzle[index] = null;
        setMoves((prev) => prev + 1);
      }
    } else if (newPuzzle[index - 4] === null) {
      newPuzzle[index - 4] = newPuzzle[index];
      newPuzzle[index] = null;
      setMoves((prev) => prev + 1);
    } else if (newPuzzle[index + 4] === null) {
      newPuzzle[index + 4] = newPuzzle[index];
      newPuzzle[index] = null;
      setMoves((prev) => prev + 1);
    }
    setPuzzle(newPuzzle);
  };

  // function to shuffle cards in puzzle
  const shuffleArray = () => {
    const array = structuredClone(puzzle);
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    setPuzzle(array);
  };

  // function to start and store the play time of puzzle
  const startGameTime = () => {
    var date = new Date(0);
    date.setSeconds(gameTime);
    var timeString = date.toISOString().substring(11, 19);
    console.log("timeString", timeString);
    let x = setInterval(() => {
      setGameTime((prev) => prev + 1);
      setPauseTimeData((gameTime) => gameTime + 1);
    }, 1000);
    setId(x);
  };

  // function to play or start a puzzle game
  const playGame = () => {
    setIsGameStarted(true);
    if (gameTime <= 0) {
      shuffleArray();
    }
    startGameTime();
  };

  // function to pause or stop a puzzle game
  const pauseGame = () => {
    setIsGameStarted(false);
    clearInterval(id);
    setGameTime(pauseTimeData);
  };

  // function to reset puzzle game, moves and game time
  const resetGame = () => {
    setMoves(0);
    shuffleArray();
    setIsGameStarted(false);
    setGameTime(0);
    clearInterval(id);
    setPauseTimeData(0);
  };

  // function to format the game time
  const formatGameTime = (s) => {
    let hour = Math.floor(s / 3600);
    s = s % 3600;
    let min = Math.floor(s / 60);
    s = s % 60;
    return `${hour.toString().padStart(2, "0")}:${min
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // return the main UI part of the puzzle
  return (
    <div className="text-xl  bg-[#E9E9E9] h-[100vh] flex flex-col items-center ">
      {/* display moves and played time of the puzzle */}
      <div className="flex gap-5 mt-12">
        <div>
          <div className="bg-[#CFD2F2] rounded-md w-28 flex flex-col items-center justify-center">
            <p>Moves</p>
            <span>{moves}</span>
          </div>
          <button className="bg-[#CAD2C7] rounded-md w-28 mt-3">
            {isGameStarted ? (
              <span onClick={pauseGame}>Pause</span>
            ) : (
              <span onClick={playGame}>Play</span>
            )}
          </button>
        </div>
        <div>
          <div className="bg-[#CFD2F2] rounded-md w-28 flex flex-col items-center justify-center">
            <p>Times</p>
            <span>{formatGameTime(gameTime)}</span>
          </div>
          <button
            className="bg-[#CAD2C7] rounded-md w-28 mt-3"
            onClick={resetGame}
          >
            Reset
          </button>
        </div>
        <div className="ms-10 text-4xl font-bold w-64 text-center">
          Fifteen Puzzle Game
        </div>
      </div>
      {/* display main UI cards of the puzzle  */}
      <div className="mt-8 h-fit w-[500px] text-3xl relative">
        {!isGameStarted && (
          <div
            onClick={playGame}
            className="z-10 bg-[#3B3D44] h-full w-full rounded-md p-7 flex items-center justify-center absolute top-0 opacity-60 cursor-pointer"
          >
            <span className=" text-white text-8xl">Play</span>
          </div>
        )}
        <div className="grid grid-cols-4 bg-[#B4CAAF] h-full w-full rounded-md p-7 gap-3 font-bold ">
          {puzzle?.map((number, index) => {
            return (
              <div
                key={index}
                className={`${
                  number === null || !isGameStarted
                    ? "bg-[#9FB49C]"
                    : "bg-[#FCF7A5]"
                } h-[100px] w-[100px]  flex items-center justify-center rounded-md transition delay-100 cursor-pointer`}
                onClick={() => {
                  moveCard(index);
                }}
              >
                {number !== null && isGameStarted && <span>{number}</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Puzzle;
