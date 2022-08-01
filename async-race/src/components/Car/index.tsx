import React, { FC } from 'react';
import { CarMethods, ICar } from '../../types/car';
import CarIcon from '../CarIcon';

interface Props {
  car: ICar;
  onChange: (car: ICar, method: CarMethods) => void;
  fetching: number[];
}

const Car: FC<Props> = ({ car, onChange, fetching }) => {
  const handleChange = (method: CarMethods): void => {
    onChange(car, method);
  };
  const [started, setStarted] = React.useState<number[]>([]);
  const [stopped, setStopped] = React.useState<number[]>([car.id]);
  const handleStart = (): void => {
    handleChange(CarMethods.Start);
    setStarted([...started, car.id]);
    setStopped((prevStopped) => prevStopped.filter((id) => id !== car.id));
  };
  const handleStop = (): void => {
    handleChange(CarMethods.Stop);
    setStopped([...stopped, car.id]);
    setStarted((prevStarted) => prevStarted.filter((id) => id !== car.id));
  };

  return (
    <div className="car">
      <div className="d-flex justify-content-start align-items-center">
        <button
          disabled={fetching.includes(car.id) || started.includes(car.id)}
          className="btn btn-outline-primary mr-1"
          onClick={handleStart}
        >
          A
        </button>
        <button
          disabled={fetching.includes(car.id) || stopped.includes(car.id)}
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
      </div>
    </div>
  );
};

export default Car;
