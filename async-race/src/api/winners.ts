import { IWinner } from '../types/car';
import { BASE_URL } from '../utils/constants';
import { Methods, Routes } from '../types';

export const getWinner = (id: number) => new Promise<IWinner>(async (resolve, reject) => {
  try {
    const res = await fetch(BASE_URL + Routes.Winners + '/' + id );
    if (res.ok) {
      const data: IWinner = await res.json();
      resolve(data);
    }
  } catch {
    reject();
  }
});

export const getWinners = () => new Promise<IWinner[]>(async (resolve, reject) => {
  try {
    const res = await fetch(BASE_URL + Routes.Winners );
    if (res.ok) {
      const data: IWinner[] = await res.json();
      resolve(data);
    }
  } catch {
    reject();
  }
});

export const deleteWinner = (id: number) => new Promise<void>(async (resolve, reject) => {
  try {
    const res = await fetch(BASE_URL + Routes.Winners + '/' + id, {
      method: Methods.DELETE,
    });
    if (res.ok) {
      resolve();
    }
  } catch {
    reject();
  }
});

export const postWinner = (winner: IWinner) => new Promise<IWinner>(async (resolve, reject) => {
  try {
    const res = await fetch(BASE_URL + Routes.Winners, {
      method: Methods.POST,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(winner),
    });
    if (res.ok) {
      const data: IWinner = await res.json();
      resolve(data);
    }
  } catch {
    reject();
  }
});

export const putWinner = (winner: IWinner) => new Promise<IWinner>(async (resolve, reject) => {
  try {
    const res = await fetch(BASE_URL + Routes.Winners + '/' + winner.id, {
      method: Methods.PUT,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(winner),
    });
    if (res.ok) {
      const data: IWinner = await res.json();
      resolve(data);
    }
  } catch {
    reject();
  }
});

export const saveWinnerById = (id: number, time: number) => new Promise<IWinner>(async (resolve, reject) => {
  try {
    const res = await fetch(BASE_URL + Routes.Winners + '/' + id );
    if (res.ok) {
      const data: IWinner = await res.json();
      const winner = {
        ...data,
        time: data.time < time ? data.time : time,
        wins: data.wins + 1,
      };
      const updated = putWinner(winner);
      resolve(updated);
    }
    if (res.status === 404) {
      const newWinner: IWinner = await postWinner({ id, time, wins: 1 });
      resolve(newWinner);
    }
  } catch {
    reject();
  }
});
