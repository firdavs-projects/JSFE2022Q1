import { ICar, ICarSpeed } from '../../types/car';
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
