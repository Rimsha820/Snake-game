import React, { useState, useEffect, useRef } from 'react';
import { Coordinate, Direction } from '../entities/types';
import { getRandomCoordinate, startGame } from '../useCases/GameLogic';
import { handleKeyPress } from '../useCases/keyPressHandler';
import { moveSnake } from '../useCases/moveSnake';

const SnakeGame: React.FC = () => {
  const boardSize = 20;
  const cellSize = 20;

  const [snake, setSnake] = useState<Coordinate[]>([
    { x: 10, y: 10 },
    { x: 11, y: 10 },
    { x: 12, y: 10 },
  ]);
  const [food, setFood] = useState<Coordinate>(getRandomCoordinate(boardSize));
  const [direction, setDirection] = useState<Direction>('LEFT');
  const [isGameRunning, setIsGameRunning] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isGameRunning) {
      intervalRef.current = window.setInterval(() => {
        moveSnake(
          direction,
          food,
          setFood,
          setScore,
          setSnake,
          setIsGameRunning,
          setIsGameOver,
          boardSize
        );
      }, 200);
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isGameRunning, direction, food]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => handleKeyPress(event, setDirection);
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-100">
      <h1 className="text-4xl text-black mb-8">Snake Game</h1>
      <div
        className="relative bg-gray-900 border-4 border-gray-700 rounded-lg mb-4"
        style={{
          width: `${boardSize * cellSize}px`,
          height: `${boardSize * cellSize}px`,
        }}
      >
        {snake.map((segment, index) => (
          <div
            key={index}
            className="absolute bg-green-500 rounded-sm"
            style={{
              width: `${cellSize}px`,
              height: `${cellSize}px`,
              left: `${segment.x * cellSize}px`,
              top: `${segment.y * cellSize}px`,
            }}
          ></div>
        ))}
        <div
          className="absolute bg-red-500 rounded-sm"
          style={{
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            left: `${food.x * cellSize}px`,
            top: `${food.y * cellSize}px`,
          }}
        ></div>
      </div>
      <button
        className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded-lg transition duration-200 mb-6"
        onClick={() => startGame(setSnake, setFood, setDirection, setIsGameRunning, setIsGameOver, setScore, boardSize)}
      >
        Start Game
      </button>
      {isGameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="bg-white p-10 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-black mb-2">Game Over</h2>
            <p className="text-black mb-4 font-bold">Score: {score}</p>
            <button
              className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded-lg transition duration-200"
              onClick={() => startGame(setSnake, setFood, setDirection, setIsGameRunning, setIsGameOver, setScore, boardSize)}
            >
              Restart Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
