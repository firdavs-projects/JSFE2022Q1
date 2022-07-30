import React, { FC } from 'react';
import { CarMethods, ICar } from '../../types/car';
import CarIcon from '../CarIcon';

interface Props {
  car: ICar;
  onChange: (car: ICar, method: CarMethods) => void;
}

const Car: FC<Props> = ({ car, onChange }) => {
  const handleChange = (method: CarMethods): void => {
    onChange(car, method);
  };

  return (
        <div className="car">
            <div className="d-flex justify-content-start align-items-center my-1">
                <button className="btn w-50px btn-success mr-1" onClick={() => handleChange(CarMethods.Select)}>Select</button>
                <button className="btn w-50px btn-danger mr-1" onClick={() => handleChange(CarMethods.Remove)}>Remove</button>
                <span className="px-2">{car.name}</span>
            </div>
            <button className="btn btn-primary mr-1" onClick={() => handleChange(CarMethods.Start)}>A</button>
            <button className="btn btn-dark mr-1" onClick={() => handleChange(CarMethods.Stop)}>B</button>
            <div className="road">
                <CarIcon color={car.color} id={car.id.toString()}/>
            </div>
        </div>
  );
};

export default Car;
