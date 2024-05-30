import { Coordinate, Direction } from '../entities/types';
import { getRandomCoordinate } from '../useCases/GameLogic';

export function moveSnake(
  direction: Direction,
  food: Coordinate,
  setFood: React.Dispatch<React.SetStateAction<Coordinate>>,
  setScore: React.Dispatch<React.SetStateAction<number>>,
  setSnake: React.Dispatch<React.SetStateAction<Coordinate[]>>,
  setIsGameRunning: React.Dispatch<React.SetStateAction<boolean>>,
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>,
  boardSize: number
) {
  setSnake((prev) => {
    const newSnake = [...prev];
    const head = { ...newSnake[0] };

    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      setFood(getRandomCoordinate(boardSize));
      setScore((prevScore) => prevScore + 1);
    } else {
      newSnake.pop();
    }

    if (
      head.x < 0 ||
      head.x >= boardSize ||
      head.y < 0 ||
      head.y >= boardSize ||
      newSnake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      setIsGameRunning(false);
      setIsGameOver(true);
      return prev;
    }

    return newSnake;
  });
}
