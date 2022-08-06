import { ICar } from '../types/car';
import { baseUrl } from '../utils/constants';
import { Methods, Routes } from '../types';

export const deleteCar = (id: number) => new Promise<void>(async (resolve, reject) => {
  try {
    const res = await fetch(baseUrl + Routes.Garage + '/' + id, {
      method: Methods.DELETE,
    });
    if (res.ok) {
      resolve();
    }
  } catch {
    reject();
  }
});

export const postCar = (car: ICar) => new Promise<ICar>(async (resolve, reject) => {
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
      resolve(data);
    }
  } catch {
    reject();
  }
});

export const putCar = (car: ICar) => new Promise<ICar>(async (resolve, reject) => {
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
      resolve(data);
    }
  } catch {
    reject();
  }
});

export const getCars = () => new Promise<ICar[]>(async (resolve, reject) => {
  try {
    const res = await fetch(baseUrl + Routes.Garage);
    if (res.ok) {
      const data: ICar[] = await res.json();
      resolve(data);
    }
  } catch {
    reject();
  }
});
