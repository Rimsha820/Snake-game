import { Direction } from '../entities/types';

export function handleKeyPress(event: KeyboardEvent, setDirection: React.Dispatch<React.SetStateAction<Direction>>) {
  switch (event.key) {
    case 'ArrowUp':
      setDirection((prev) => (prev !== 'DOWN' ? 'UP' : prev));
      break;
    case 'ArrowDown':
      setDirection((prev) => (prev !== 'UP' ? 'DOWN' : prev));
      break;
    case 'ArrowLeft':
      setDirection((prev) => (prev !== 'RIGHT' ? 'LEFT' : prev));
      break;
    case 'ArrowRight':
      setDirection((prev) => (prev !== 'LEFT' ? 'RIGHT' : prev));
      break;
  }
}
