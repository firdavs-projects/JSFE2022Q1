import { ICar, IDriveInfo } from '../types/car';
import { CAR_WIDTH, CARS, MODELS } from './constants';

const generateRandomColor = (): string => {
  const COLOR_LETTERS = '0123456789ABCDEF';
  const COLOR_LENGTH = 6;
  let color = '#';
  for (let i = 0; i < COLOR_LENGTH; i++) {
    color += COLOR_LETTERS[Math.floor(Math.random() * COLOR_LETTERS.length)];
  }
  return color;
};

const generateRandomCarName = (): string => {
  const car = CARS[Math.floor(Math.random() * CARS.length)];
  const model = MODELS[Math.floor(Math.random() * MODELS.length)];
  return `${car} ${model}`;
};

export const generateCar = (): ICar => {
  return {
    id: Math.random(),
    name: generateRandomCarName(),
    color: generateRandomColor(),
  };
};

export const animateCar = ( driving: Promise<void>, driveInfo: IDriveInfo): () => void => {
  const FRAMES_IN_MINUTE = 60;
  const MS_IN_SECOND = 1000;
  const { distance, velocity, id } = driveInfo;

  const screenWidth = document.documentElement.clientWidth;
  const finishPosition = screenWidth - CAR_WIDTH;
  const duration = distance / velocity / MS_IN_SECOND;

  let isDriving = true;
  driving.catch(()=> isDriving = false);
  const carEl = document.getElementById(`${id}`);
  if (carEl) {
    let currentPosition = carEl.getBoundingClientRect().x;
    const framesCount = duration * FRAMES_IN_MINUTE;
    const step = (finishPosition - currentPosition) / framesCount;
    const tick = (): void => {
      currentPosition += step;
      carEl.style.transform = `translateX(${currentPosition}px)`;
      if (currentPosition < finishPosition && isDriving) {
        requestAnimationFrame(tick);
      }
    };
    tick();
  }
  return (): void => {isDriving = false;};
};
