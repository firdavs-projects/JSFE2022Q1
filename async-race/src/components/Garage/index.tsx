import React, { FC, useEffect, useState } from 'react';
import { Methods, Routes } from '../../types';
import { CarMethods, ICar, ICarSpeed } from '../../types/car';
import { generateCar } from '../../utils';
import { baseUrl, CARS_COUNT } from '../../utils/constants';
import Cars from '../Cars';

const Garage: FC = () => {
  const [cars, setCars] = useState<ICar[]>([]);
  const [fetching, setFetching] = useState<number[]>([]);
  const brokenCarIds: number[] = [];

  const getCars = async (): Promise<void> => {
    try {
      const res = await fetch(baseUrl + Routes.Garage);
      if (res.ok) {
        const data: ICar[] = await res.json();
        setCars(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getCars();
  }, []);

  const postCar = async (car: ICar): Promise<void> => {
    try {
      setFetching([...fetching, car.id]);
      const res = await fetch(baseUrl + Routes.Garage, {
        method: Methods.POST,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(car),
      });
      if (res.ok) {
        const data: ICar = await res.json();
        setCars((prevCars) => [...prevCars, data]);
        setFetching((prevFetching) => prevFetching.filter((id) => id !== car.id));
      }
    } catch (e) {
      console.error(e);
      setFetching((prevFetching) => prevFetching.filter((id) => id !== car.id));
    }
  };

  const handleCreateCars = (): void => {
    setFetching([...fetching, CARS_COUNT]);
    for (let i = 0; i < CARS_COUNT; i++) {
      postCar(generateCar());
    }
    setFetching((prevFetching) => prevFetching
      .filter((id) => id !== CARS_COUNT));
  };

  const carRemove = async (id: number): Promise<void> => {
    try {
      setFetching([...fetching, id]);
      const res = await fetch(baseUrl + Routes.Garage + '/' + id, {
        method: Methods.DELETE,
      });
      if (res.status === 200) {
        setCars((prevCars) => prevCars.filter(car => car.id !== id));
        setFetching((prevFetching) => prevFetching.filter((i) => i !== id));
      }
    } catch (err) {
      console.log(err);
      setFetching((prevFetching) => prevFetching.filter((i) => i !== id));
    }
  };

  const startDrive = async (id: number): Promise<void> => {
    try {
      setFetching([...fetching, id]);
      const res = await fetch(baseUrl + Routes.Engine + `?id=${id}&status=drive`, {
        method: Methods.PATCH,
      });
      if (res.status === 200) {
        // const data = await res.json();
        // will get time of car
        setFetching((prevFetching) => prevFetching.filter((i) => i !== id));
      }
      if (res.status === 500) {
        console.log('Car is broken');
        brokenCarIds.push(id);
        setFetching((prevFetching) => prevFetching.filter((i) => i !== id));
      }
    } catch (err) {
      console.log(err);
      setFetching((prevFetching) => prevFetching.filter((i) => i !== id));
    }
  };

  const animatePosition = (id: number, distance: number, velocity: number): void => {
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
        if (currentX < endX && !brokenCarIds.includes(id)) {
          requestAnimationFrame(tick);
        }
      };
      tick();
    }
  };

  const carStart = async (id: number): Promise<void> => {
    brokenCarIds.splice(brokenCarIds.indexOf(id), 1);
    try {
      setFetching(([...fetching, id]));
      const res = await fetch(baseUrl + Routes.Engine + `?id=${id}&status=started`, {
        method: Methods.PATCH,
      });
      if (res.status === 200) {
        const data: ICarSpeed = await res.json();
        animatePosition(id, data.distance, data.velocity);
        setFetching((prevFetching) => prevFetching.filter((i) => i !== id));
        await startDrive(id);
      }
    } catch (err) {
      console.log(err);
      setFetching((prevFetching) => prevFetching.filter((i) => i !== id));
    }
  };

  const carStop = async (id: number): Promise<void> => {
    const el = document.getElementById(`${id}`);
    if (el) {
      el.style.transform = 'translateX(0px)';
    }
    try {
      setFetching(([...fetching, id]));
      const res = await fetch(baseUrl + Routes.Engine + `?id=${id}&status=stopped`, {
        method: Methods.PATCH,
      });
      if (res.ok) {
        setFetching((prevFetching) => prevFetching.filter((i) => i !== id));
      }
    } catch (err) {
      console.log(err);
      setFetching((prevFetching) => prevFetching.filter((i) => i !== id));
    }
  };

  const handleCarChange = async (car: ICar, method: CarMethods): Promise<void> => {
    switch (method) {
      case CarMethods.Start:
        await carStart(car.id);
        break;
      case CarMethods.Stop:
        await carStop(car.id);
        break;
      case CarMethods.Remove:
        await carRemove(car.id);
        break;
    }
  };

  return (
    <section className="container-fluid">
      <h3>Garage ({cars.length})</h3>
      <button
        disabled={fetching.includes(CARS_COUNT)}
        className="btn btn-outline-primary"
        onClick={handleCreateCars}
      >
        Create 100 cars
      </button>
      {/*<button className="btn" onClick={handleStartRace}>Start Race</button>*/}
      <Cars cars={cars} onChange={handleCarChange} fetching={fetching}/>
    </section>
  );
};

export default Garage;
