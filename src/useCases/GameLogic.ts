import { Coordinate, Direction } from '../entities/types';

export function getRandomCoordinate(boardSize: number): Coordinate {
  const x = Math.floor(Math.random() * boardSize);
  const y = Math.floor(Math.random() * boardSize);

  return {
    x: Math.max(0, Math.min(boardSize - 1, x)),
    y: Math.max(0, Math.min(boardSize - 1, y)),
  };
}

export function startGame(
  setSnake: React.Dispatch<React.SetStateAction<Coordinate[]>>,
  setFood: React.Dispatch<React.SetStateAction<Coordinate>>,
  setDirection: React.Dispatch<React.SetStateAction<Direction>>,
  setIsGameRunning: React.Dispatch<React.SetStateAction<boolean>>,
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>,
  setScore: React.Dispatch<React.SetStateAction<number>>,
  boardSize: number
) {
  setSnake([
    { x: 10, y: 10 },
    { x: 11, y: 10 },
    { x: 12, y: 10 },
  ]);
  setFood(getRandomCoordinate(boardSize));
  setDirection('LEFT');
  setIsGameRunning(true);
  setIsGameOver(false);
  setScore(0);
}
