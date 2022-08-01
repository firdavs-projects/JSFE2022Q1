import React, { FC, useEffect, useState } from 'react';
import { CarMethods, ICar, ICarSpeed, IFormMethods } from '../../types/car';
import { generateCar } from '../../utils';
import { CARS_COUNT } from '../../utils/constants';
import Cars from '../Cars';
import { deleteCar, getCars, postCar, putCar } from '../api/garage';
import { patchDriveCar, patchStartCar, patchStopCar } from '../api/endine';
import CarForm from '../CarForm';

const brokenCarIds: number[] = [];
const stoppedCarIds: number[] = [];

const Garage: FC = () => {
  const [cars, setCars] = useState<ICar[]>([]);
  const [fetching, setFetching] = useState<number[]>([]);
  const [selectedCar, setSelectedCar] = useState<ICar | null>(null);

  useEffect(() => {
    getCars((data: ICar[]) => setCars(data));
  }, []);

  const createCar = (car: ICar): void => {
    setFetching([...fetching, car.id]);
    postCar(
      car,
      (data: ICar) =>  setCars((prevCars) => [...prevCars, data]),
      () => setFetching((prev) => prev.filter((id) => id !== car.id)),
    );
  };

  const handleCreateCars = (): void => {
    setFetching([...fetching, CARS_COUNT]);
    for (let i = 0; i < CARS_COUNT; i++) {
      createCar(generateCar());
    }
    setFetching((prevFetching) => prevFetching
      .filter((id) => id !== CARS_COUNT));
  };

  const removeCar = (id: number): void => {
    setFetching([...fetching, id]);
    deleteCar(id,
      () => setCars((prevCars) => prevCars.filter(car => car.id !== id)),
      () => setFetching((prev) => prev.filter((i) => i !== id)),
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

  const startCar = async (id: number): Promise<void> => {
    brokenCarIds.splice(brokenCarIds.indexOf(id), 1);
    setFetching((prev) => [...prev, id]);
    const onFinish = (data: ICarSpeed) => {
      animateCar(id, data.distance, data.velocity);
      patchDriveCar(id,
        () => brokenCarIds.push(id),
        () => setFetching((prev) => prev.filter((i) => i !== id)),
      );
    };
    patchStartCar(id, onFinish);
  };

  const stopCar = async (id: number): Promise<void> => {
    stoppedCarIds.push(id);
    const el = document.getElementById(`${id}`);
    setFetching(([...fetching, id]));
    patchStopCar(
      id,
      () => {
        setFetching((prev) => prev.filter((i) => i !== id));
        if (el) {
          el.style.transform = 'translateX(0px)';
        }
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
      <h3>Garage ({cars.length})</h3>
      <div className="d-flex">
        <button
            disabled={fetching.includes(CARS_COUNT)}
            className="btn btn-success mr-1"
            onClick={handleCreateCars}
        >
          Generate 100 cars
        </button>
        <button className="btn btn-primary">Start Race</button>
      </div>
      <CarForm onSave={handleCarFormSubmit} method={IFormMethods.Create}/>
      <CarForm onSave={handleCarFormSubmit} car={selectedCar} method={IFormMethods.Update}/>

      <Cars cars={cars} onChange={handleCarChange} fetching={fetching}/>
    </section>
  );
};

export default Garage;
