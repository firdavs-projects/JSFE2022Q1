import React, { FC } from 'react';
import { CarMethods, ICar } from '../../types/car';
import CarIcon from '../CarIcon';
import finishIcon from '../../assets/icons/finish.png';

interface Props {
  car: ICar;
  onChange: (car: ICar, method: CarMethods) => void;
  fetching: number[];
  raceState: [number[], (prev: number[]) => void];
}

const Car: FC<Props> = ({ car, onChange, fetching, raceState }) => {
  const [isStarted, setIsStarted] = raceState;
  const handleChange = (method: CarMethods): void => {
    onChange(car, method);
  };

  const handleStart = (): void => {
    handleChange(CarMethods.Start);
    setIsStarted([...isStarted, car.id]);
  };
  const handleStop = (): void => {
    handleChange(CarMethods.Stop);
    setIsStarted(isStarted.filter(id => id !== car.id));
  };

  return (
    <div className="car">
      <div className="d-flex justify-content-start align-items-center">
        <button
          disabled={fetching.includes(car.id) || isStarted.includes(car.id)}
          className="btn btn-outline-primary mr-1"
          onClick={handleStart}
        >
          A
        </button>
        <button
          disabled={!isStarted.includes(car.id)}
          className="btn btn-outline-dark mr-1"
          onClick={handleStop}
        >
          B
        </button>
        <button
          disabled={fetching.includes(car.id)}
          className="btn w-50px btn-outline-success mr-1"
          onClick={() => handleChange(CarMethods.Select)}
        >
          Select
        </button>
        <button
          disabled={fetching.includes(car.id)}
          className="btn w-50px btn-outline-danger"
          onClick={() => handleChange(CarMethods.Remove)}
        >
          Remove
        </button>
        <span className="px-2">{car.name}</span>
      </div>
      <div className="road">
        <CarIcon color={car.color} id={car.id.toString()}/>
        <img src={finishIcon} alt="finish"/>
      </div>
    </div>
  );
};

export default Car;
