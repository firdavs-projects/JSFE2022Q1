import { baseUrl } from '../utils/constants';
import { Methods, Routes, StopAnimate } from '../types';
import { IDriveInfo } from '../types/car';
import { animateCar } from '../utils';

export const driveEngine = (id: number) => new Promise<void>(async (resolve, reject) => {
  try {
    const res = await fetch(baseUrl + Routes.Engine + `?id=${id}&status=drive`, {
      method: Methods.PATCH,
    });
    if (res.ok) {
      resolve();
    }
    if (res.status === 500) {
      reject(true);
    }
  } catch {
    reject();
  }
});

export const startEngine = (id: number) => new Promise<IDriveInfo>(async (resolve, reject) => {
  try {
    const res = await fetch(baseUrl + Routes.Engine + `?id=${id}&status=started`, {
      method: Methods.PATCH,
    });
    if (res.status === 200) {
      const data: IDriveInfo = await res.json();
      resolve(data);
    }
  } catch {
    reject();
  }
});

export const stopEngine = (id: number) => new Promise<void>(async (resolve, reject) => {
  try {
    const res = await fetch(baseUrl + Routes.Engine + `?id=${id}&status=stopped`, {
      method: Methods.PATCH,
    });
    if (res.status === 200) {
      resolve();
    }
  } catch {
    reject();
  }
});

export const raceStartPromise = (
  id: number,
  closeFetch: (id: number) => void,
  carsInDrive: StopAnimate[],
) => new Promise<number>(async (resolve, reject) => {
  try {
    const driveInfo: IDriveInfo = await startEngine(id);
    const driving = driveEngine(id);
    const stopAnimate = animateCar(driving, { ...driveInfo, id });
    carsInDrive.push({ id, stopAnimate });
    driving.then(() => resolve(id)).catch(() => reject(id)).finally(() => closeFetch(id));
  } catch  {
    reject();
  }
});
