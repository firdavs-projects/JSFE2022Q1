import { useState } from 'react';


export const useTimer = (): [{ [p: number]: number }, ((id: number) => void), ((id: number) => number)] => {
  const [timers, setTimer] = useState<{
    [key: number]: NodeJS.Timer;
  }>({});
  const [times, setTime] = useState<{
    [key: number]: number;
  }>({});

  const start = (id: number) => {
    let time = 0;
    const timer = setInterval(() => {
      time += 0.01;
      times[id] = time;
      timers[id] = timer;
      setTime(times);
      setTimer(timers);
    }, 10);
  };

  const stop = (id: number): number => {
    clearInterval(timers[id]);
    const currentTime = times[id];
    delete times[id];
    delete timers[id];
    setTime(times);
    setTimer(timers);
    return currentTime;
  };

  return [times, start, stop ];
};
