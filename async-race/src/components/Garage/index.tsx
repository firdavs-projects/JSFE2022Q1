import React, { FC, useEffect, useState } from 'react';
import { CarMethods, ICar, IFormMethods } from '../../types/car';
import { animateCar, generateCar } from '../../utils';
import { CARS_COUNT } from '../../utils/constants';
import Cars from '../Cars';
import { deleteCar, getCars, postCar, putCar } from '../../api/garage';
import { stopEngine, raceStartPromise, startEngine, driveEngine } from '../../api/engine';
import CarForm from '../CarForm';
import Win from '../Win';
import { useTimer } from '../../hooks/useTimer';
import { deleteWinner, saveWinnerById } from '../../api/winners';
import { StopAnimate, Tabs } from '../../types';

const carsInDrive: StopAnimate[] = [];

const Garage: FC<{ tab: Tabs }> = ({ tab }) => {
  const [cars, setCars] = useState<ICar[]>([]);
  const [fetching, setFetching] = useState<number[]>([]);
  const [selectedCar, setSelectedCar] = useState<ICar | null>(null);
  const [winner, setWinner] = useState<{ time: number, car: ICar } | null>(null);
  const [startTimer, stopTimer] = useTimer();

  useEffect(() => {
    if (tab === Tabs.Garage) { getCars().then(setCars);}
  }, [tab]);

  const closeFetching = (id: number): void => setFetching(
    (prev) => prev.filter((i) => i !== id),
  );

  const openFetching = (id: number): void => setFetching((prev) => [...prev, id]);

  const createCar = (car: ICar): void => {
    openFetching(car.id);
    postCar(car)
      .then((data: ICar) =>  setCars((prev) => [...prev, data]))
      .finally(() => closeFetching(car.id));
  };

  const handleCreateCars = (): void => {
    for (let i = 0; i < CARS_COUNT; i++) {
      createCar(generateCar());
    }
  };

  const removeCar = (id: number): void => {
    openFetching(id);
    deleteCar(id)
      .then(() => setCars((prev) => prev.filter((car) => car.id !== id)))
      .finally(() => closeFetching(id));
    deleteWinner(id).then();
  };

  const startCar = async (id: number): Promise<void> => {
    openFetching(id);
    const info = await startEngine(id);
    const driving = driveEngine(id).finally(()=> closeFetching(id));
    const stopAnimate = animateCar(driving, { ...info, id });
    carsInDrive.push({ id, stopAnimate });
  };

  const stopCar = (id: number): void => {
    carsInDrive.find(c => c.id === id)?.stopAnimate();
    carsInDrive.splice(carsInDrive.findIndex(c => c.id === id), 1);
    const carEl = document.getElementById(`${id}`);
    openFetching(id);
    stopEngine(id).finally(() => {
      closeFetching(id);
      if (carEl) { carEl.style.transform = 'translateX(0px)'; }
    });
  };

  const saveWinner = (id: number, time: number): void => {
    const car = cars.find(c => c.id === id);
    saveWinnerById(id, time).then();
    if (car) {
      setWinner({ time, car });
    }
  };

  const startRace = (race: ICar[]): void => {
    startTimer();
    race.forEach(c => openFetching(c.id));
    const promises = race.map(c => raceStartPromise(c.id, closeFetching, carsInDrive));
    Promise.any<number>(promises)
      .then((id) => {
        const time = Math.round(stopTimer() * 100) / 100;
        saveWinner(id, time);
      })
      .catch(() => stopTimer());
  };

  const handleCarFormSubmit = (car: ICar): void => {
    if (selectedCar?.id === car.id) {
      putCar(car)
        .then(() => setCars((prev) => prev.map((c) => c.id === car.id ? car : c)));
      setSelectedCar(null);
      return;
    }
    createCar(car);
  };

  const handleCarDrive = (car: ICar, method: CarMethods): void => {
    switch (method) {
      case CarMethods.Start:
        startCar(car.id).then();
        break;
      case CarMethods.Stop:
        stopCar(car.id);
        break;
      case CarMethods.Remove:
        removeCar(car.id);
        break;
      case CarMethods.Select:
        setSelectedCar(car);
        break;
      default:
        break;
    }
  };

  const handleRace = (carsInRace: ICar[], method: CarMethods): void => {
    switch (method) {
      case CarMethods.Race:
        startRace(carsInRace);
        break;
      case CarMethods.Reset:
        carsInRace.forEach(c => stopCar(c.id));
        setWinner(null);
        break;
      default:
        break;
    }
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
      <Cars cars={cars} onDrive={handleCarDrive} onRace={handleRace} fetching={fetching}/>
      {winner && (<Win winner={winner}/>)}
    </section>
  );
};

export default Garage;
