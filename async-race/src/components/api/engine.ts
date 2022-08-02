import { baseUrl } from '../../utils/constants';
import { Methods, Routes } from '../../types';
import { ICarSpeed } from '../../types/car';

export const patchDriveCar = async (
  id: number,
  finish: (id: number) => void,
  onError: (id: number) => void,
  end: (id: number) => void,
): Promise<void> => {
  try {
    const res = await fetch(baseUrl + Routes.Engine + `?id=${id}&status=drive`, {
      method: Methods.PATCH,
    });
    if (res.ok && finish) {
      finish(id);
    }
    if (res.status === 500) {
      console.log('Car is broken');
      onError(id);
    }
    end(id);
  } catch (err) {
    console.log(err);
    end(id);
  }
};

export const patchStartCar = async (
  id: number,
  finish: (id: number, data: ICarSpeed) => void,
): Promise<void> => {
  try {
    const res = await fetch(baseUrl + Routes.Engine + `?id=${id}&status=started`, {
      method: Methods.PATCH,
    });
    if (res.status === 200) {
      const data: ICarSpeed = await res.json();
      finish(id, data);
    }
  } catch (err) {
    console.log(err);
  }
};

export const patchStopCar = async (id: number, end: () => void ): Promise<void> => {
  try {
    await fetch(baseUrl + Routes.Engine + `?id=${id}&status=stopped`, {
      method: Methods.PATCH,
    });
    end();
  } catch (err) {
    console.log(err);
    end();
  }
};
