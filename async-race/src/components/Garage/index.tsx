import React, { FC, useEffect, useState } from 'react';
import { CarMethods, ICar, ICarSpeed, IFormMethods, IWinner } from '../../types/car';
import { generateCar } from '../../utils';
import { CARS_COUNT } from '../../utils/constants';
import Cars from '../Cars';
import { deleteCar, getCars, postCar, putCar } from '../api/garage';
import { patchDriveCar, patchStartCar, patchStopCar } from '../api/engine';
import CarForm from '../CarForm';
import Win from '../Win';
import { useTimer } from '../../hooks/useTimer';
import { getWinner, postWinner, putWinner } from '../api/winners';
import { Tabs } from '../../types';

const brokenCarIds: number[] = [];
const stoppedCarIds: number[] = [];

const Garage: FC<{ tab: Tabs }> = ({ tab }) => {
  const [cars, setCars] = useState<ICar[]>([]);
  const [fetching, setFetching] = useState<number[]>([]);
  const [selectedCar, setSelectedCar] = useState<ICar | null>(null);
  const [winners, setWinners] = useState<IWinner[]>([]);
  const [winner, setWinner] = useState<{ win: IWinner, car: ICar } | null>(null);
  const [times, startTimer, stopTimer] = useTimer();

  useEffect(() => {
    if (tab === Tabs.Garage) {
      getCars(setCars);
    }
  }, [tab]);

  useEffect(() => {
    if (winners.length === 1) {
      const win = winners[0];
      const car = cars.find(c => c.id === win.id);
      const updated = {
        ...win,
        wins: win.wins + 1,
        time: win?.lastTime
          ? win.lastTime < win.time ? win.lastTime : win.time
          : win.time,
      };
      delete updated.lastTime;
      if (car) {
        setWinner({ win, car });
        putWinner(updated);
      }
    }
  }, [winners]);

  const closeFetching = (id: number): void => {
    setFetching((prev) => prev.filter((i) => i !== id));
  };

  const openFetching = (id: number): void => {
    setFetching((prev) => [...prev, id]);
  };

  const createCar = (car: ICar): void => {
    openFetching(car.id);
    postCar(
      car,
      (data: ICar) =>  setCars((prevCars) => [...prevCars, data]),
      closeFetching,
    );
  };

  const handleCreateCars = (): void => {
    openFetching(CARS_COUNT);
    for (let i = 0; i < CARS_COUNT; i++) {
      createCar(generateCar());
    }
    closeFetching(CARS_COUNT);
  };

  const removeCar = (id: number): void => {
    openFetching(id);
    deleteCar(id,
      () => setCars((prevCars) => prevCars.filter(car => car.id !== id)),
      closeFetching,
    );
  };

  const animateCar = (id: number, distance: number, velocity: number): void => {
    const screenWidth = document.documentElement.clientWidth;
    const endX = screenWidth - 100;
    const duration = distance / velocity / 1000;
    const el = document.getElementById(`${id}`);
    if (el) {
      let currentX = el.getBoundingClientRect().x;
      const framesCount = duration * 60;
      const step = (endX - currentX) / framesCount;
      const tick = (): void => {
        currentX += step;
        el.style.transform = `translateX(${currentX}px)`;
        if (currentX < endX && !brokenCarIds.includes(id) && !stoppedCarIds.includes(id)) {
          requestAnimationFrame(tick);
        }
      };
      tick();
    }
  };

  const onDriveComplete = (id: number): void => {
    const time = Math.round(times[id] * 100) / 100;
    stopTimer(id);
    getWinner(
      id,
      (data) => setWinners((prev) => [...prev, { ...data, lastTime: data.time, time }]),
      () => postWinner(
        { id, time, wins: 0 },
        (data: IWinner) => setWinners((prev) => [...prev, data]),
      ),
    );
  };

  const onBrokenEngine = (id: number): void => {
    brokenCarIds.push(id);
    stopTimer(id);
  };

  const onFinish = (id: number, data: ICarSpeed) => {
    animateCar(id, data.distance, data.velocity);
    patchDriveCar(id,
      onDriveComplete,
      onBrokenEngine,
      closeFetching,
    );
  };

  const startCar = async (id: number): Promise<void> => {
    startTimer(id);
    brokenCarIds.splice(brokenCarIds.indexOf(id), 1);
    openFetching(id);
    patchStartCar(id, onFinish);
  };

  const stopCar = async (id: number): Promise<void> => {
    stoppedCarIds.push(id);
    const el = document.getElementById(`${id}`);
    openFetching(id);
    patchStopCar(
      id,
      () => {
        closeFetching(id);
        if (el) { el.style.transform = 'translateX(0px)'; }
        stoppedCarIds.splice(stoppedCarIds.indexOf(id), 1);
      },
    );
  };

  const handleCarChange = async (car: ICar, method: CarMethods): Promise<void> => {
    switch (method) {
      case CarMethods.Start:
        await startCar(car.id);
        break;
      case CarMethods.Stop:
        await stopCar(car.id);
        break;
      case CarMethods.Remove:
        await removeCar(car.id);
        break;
      case CarMethods.Select:
        setSelectedCar(car);
        break;
      case CarMethods.RaceStart:
        await startCar(car.id);
        break;
      case CarMethods.Reset:
        await stopCar(car.id);
        setWinners([]);
        setWinner(null);
        break;
      default:
        break;
    }
  };

  const handleCarFormSubmit = (car: ICar): void => {
    if (selectedCar?.id === car.id) {
      putCar(car,
        () => setCars((prevCars) => prevCars.map((c) => c.id === car.id ? car : c)),
      );
      setSelectedCar(null);
      return;
    }
    createCar(car);
  };

  return (
    <section className="container-fluid">
      <h4>Garage ({cars.length})</h4>
      <button
        disabled={fetching.includes(CARS_COUNT)}
        className="btn btn-success mb-1"
        onClick={handleCreateCars}
      >
        Generate 100 cars
      </button>
      <CarForm onSave={handleCarFormSubmit} method={IFormMethods.Create}/>
      <CarForm onSave={handleCarFormSubmit} car={selectedCar} method={IFormMethods.Update}/>
      <Cars cars={cars} onChange={handleCarChange} fetching={fetching}/>
      {winner && (<Win winner={winner}/>)}
    </section>
  );
};

export default Garage;
