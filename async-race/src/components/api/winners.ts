import { IWinner } from '../../types/car';
import { baseUrl } from '../../utils/constants';
import { Methods, Routes } from '../../types';

export const getWinner = async (
  id: number,
  finish: (data: IWinner) => void,
  ifNotFound: ()=> void,
): Promise<void> => {
  try {
    const res = await fetch(baseUrl + Routes.Winners + '/' + id );
    if (res.ok) {
      const data: IWinner = await res.json();
      finish(data);
    }
    if (res.status === 404) {
      ifNotFound();
    }
  } catch (e) {
    console.error(e);
  }
};

export const getWinners = async (finish: (data: IWinner[]) => void): Promise<void> => {
  try {
    const res = await fetch(baseUrl + Routes.Winners );
    if (res.ok) {
      const data: IWinner[] = await res.json();
      finish(data);
    }
  } catch (e) {
    console.error(e);
  }
};

export const postWinner = async (winner: IWinner, finish: (winner: IWinner) => void ): Promise<void> => {
  try {
    const res = await fetch(baseUrl + Routes.Winners, {
      method: Methods.POST,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(winner),
    });
    if (res.ok) {
      const data: IWinner = await res.json();
      finish(data);
    }
  } catch (e) {
    console.error(e);
  }
};
