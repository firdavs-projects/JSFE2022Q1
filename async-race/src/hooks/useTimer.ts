import { useState } from 'react';


export const useTimer = (): [(() => void), (() => number)] => {
  const [timer, setTimer] = useState<{ id?: number }>({});
  const [time, setTime] = useState<{ count?: number }>({});

  const start = () => {
    let count = 0;
    timer.id = window.setInterval(() => {
      count += 0.01;
      time.count = count;
      setTime(time);
    }, 10);
    setTimer(timer);
  };

  const stop = (): number => {
    const current = time.count || 0;
    clearInterval(timer.id);
    delete timer.id;
    delete time.count;
    setTime(time);
    setTimer(timer);
    return current;
  };

  return [start, stop ];
};
