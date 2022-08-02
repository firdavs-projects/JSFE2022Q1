import { ICar } from '../../types/car';
import { baseUrl } from '../../utils/constants';
import { Methods, Routes } from '../../types';

export const postCar = async (
  car: ICar,
  finish: (data: ICar) => void,
  end: (id: number) => void,
): Promise<void> => {
  try {
    const res = await fetch(baseUrl + Routes.Garage, {
      method: Methods.POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
    if (res.ok) {
      const data: ICar = await res.json();
      finish(data);
    }
    end(car.id);
  } catch (e) {
    console.error(e);
    end(car.id);
  }
};

export const putCar = async (
  car: ICar,
  finish: (car: ICar) => void,
  end?: () => void,
): Promise<void> => {
  try {
    const res = await fetch(baseUrl + Routes.Garage + '/' + car.id, {
      method: Methods.PUT,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: car.name,
        color: car.color,
      }),
    });
    if (res.ok) {
      const data: ICar = await res.json();
      finish(data);
    }
    if (end) {
      end();
    }
  } catch (err) {
    console.log(err);
    if (end) {
      end();
    }
  }
};

export const deleteCar = async (
  id: number,
  finish: () => void,
  end: (id: number) => void,
): Promise<void> => {
  try {
    const res = await fetch(baseUrl + Routes.Garage + '/' + id, {
      method: Methods.DELETE,
    });
    if (res.status === 200) {
      finish();
    }
    end(id);
  } catch (err) {
    console.log(err);
    end(id);
  }
};

export const getCars = async (finish: (data: ICar[]) => void): Promise<void> => {
  try {
    const res = await fetch(baseUrl + Routes.Garage);
    if (res.ok) {
      const data: ICar[] = await res.json();
      finish(data);
    }
  } catch (e) {
    console.error(e);
  }
};
