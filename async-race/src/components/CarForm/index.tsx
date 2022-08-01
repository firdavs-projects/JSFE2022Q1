import React, { FC } from 'react';
import { ICar, IFormMethods } from '../../types/car';

interface Props {
  car: ICar;
  onChange: (car: ICar, method: IFormMethods) => void;
}

const CarForm: FC<Props> = ({ car, onChange }) => {
  return (
    <div>
      CarForm
    </div>
  );
};

export default CarForm;
