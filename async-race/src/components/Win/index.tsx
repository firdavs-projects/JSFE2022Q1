import React, { FC } from 'react';
import { ICar, IWinner } from '../../types/car';
import CarIcon from '../CarIcon';

interface Props {
  winner: {
    win: IWinner,
    car: ICar
  };
}

const Win: FC<Props> = ({ winner }) => {
  const { win, car } = winner;
  if (car) {
    return (
      <div className="winner-alert" role="alert">
        <h4 className="alert-heading text-center">Winner!</h4>
          <div className="text-center">
              <CarIcon className="win-car" color={car.color} id={'winner'}/>
              <strong>{car.name}</strong> went first <strong>[{win.time}s]</strong>
          </div>
      </div>
    );
  }
  return null;
};

export default Win;
