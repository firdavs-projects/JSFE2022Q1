import { ICar } from '../../types/car';
import { baseUrl } from '../../utils/constants';
import { Methods, Routes } from '../../types';

export const postCar = async (
  car: ICar,
  finish: (data: ICar) => void,
  end: () => void,
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
    end();
  } catch (e) {
    console.error(e);
    end();
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
  end: () => void,
): Promise<void> => {
  try {
    const res = await fetch(baseUrl + Routes.Garage + '/' + id, {
      method: Methods.DELETE,
    });
    if (res.status === 200) {
      finish();
    }
    end();
  } catch (err) {
    console.log(err);
    end();
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
