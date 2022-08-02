import React, { FC, useEffect, useState } from 'react';
import { ICar, IFormMethods } from '../../types/car';
import { generateCar } from '../../utils';

interface Props {
  onSave: (car: ICar) => void;
  method: IFormMethods;
  car?: ICar | null;
}
const emptyCar: ICar = {
  name: '',
  color: '#000000',
  id: 0,
};

const CarForm: FC<Props> = ({ car, onSave, method }) => {
  const [formData, setFormData] = useState<ICar>(emptyCar);

  useEffect(() => {
    if (car) { setFormData(car);}
  }, [car]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const generated = generateCar();
    const newCar = { ...formData };
    if (!newCar.id) {
      newCar.id = generated.id;
    }
    if (!newCar.name.trim()) {
      newCar.name = generated.name;
      newCar.color = generated.color;
    }
    setFormData(emptyCar);
    onSave(newCar);
  };
  return (
    <form className="d-flex mt-1" onSubmit={handleSubmit}>
      <input
          onChange={handleChange}
          className="form-control h-75 mb-1 mr-1"
          name="name"
          value={formData.name}
          type="text"
          placeholder={method === IFormMethods.Update ? 'Select the car' : 'Name of car (if empty, will be generated)'}
      />
      <input
          onChange={handleChange}
          className="form-control w-150px h-auto mb-1 mr-1"
          name="color"
          value={formData.color}
          type="color"
      />
      <button
        disabled={method === IFormMethods.Update && !car}
        type="submit"
        className="btn btn-outline-primary w-150px mb-1 h-auto"
      >
        {method === IFormMethods.Update ? 'Update' : 'Add'}
      </button>
    </form>
  );
};

export default CarForm;
