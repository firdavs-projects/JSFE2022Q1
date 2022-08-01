import { baseUrl } from '../../utils/constants';
import { Methods, Routes } from '../../types';
import { ICarSpeed } from '../../types/car';

export const patchDriveCar = async (
  id: number,
  onError: () => void,
  end: () => void,
  finish?: () => void,
): Promise<void> => {
  try {
    const res = await fetch(baseUrl + Routes.Engine + `?id=${id}&status=drive`, {
      method: Methods.PATCH,
    });
    if (res.ok && finish) {
      finish();
    }
    if (res.status === 500) {
      console.log('Car is broken');
      onError();
    }
    end();
  } catch (err) {
    console.log(err);
    end();
  }
};

export const patchStartCar = async (
  id: number,
  finish: (data: ICarSpeed) => void,
): Promise<void> => {
  try {
    const res = await fetch(baseUrl + Routes.Engine + `?id=${id}&status=started`, {
      method: Methods.PATCH,
    });
    if (res.status === 200) {
      const data: ICarSpeed = await res.json();
      finish(data);
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
