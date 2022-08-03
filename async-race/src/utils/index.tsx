import { ICar, IWinner } from '../types/car';
import { cars, models } from './constants';


const generateRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const generateRandomCarName = (): string => {
  const car = cars[Math.floor(Math.random() * cars.length)];
  const model = models[Math.floor(Math.random() * models.length)];
  return `${car} ${model}`;
};

export const generateCar = (): ICar => {
  return {
    id: Math.random(),
    name: generateRandomCarName(),
    color: generateRandomColor(),
  };
};

export const updateWinner = (winner: IWinner, isWinner = false): IWinner => {
  const updated = {
    ...winner,
    wins: isWinner ? winner.wins + 1 : winner.wins,
    time: winner?.lastTime
      ? winner.lastTime < winner.time ? winner.lastTime : winner.time
      : winner.time,
  };
  delete updated.lastTime;
  return updated;
};
