import React, { FC, useCallback, useEffect, useState } from 'react';
import { Methods, Routes } from '../../types';
import { CarMethods, ICar, ICarSpeed } from '../../types/car';
import { generateCar } from '../../utils';
import { baseUrl, CARS_COUNT } from '../../utils/constants';
import Cars from '../Cars';

const Garage: FC = () => {
  const [cars, setCars] = useState<ICar[]>([]);

  const brokenCarIds: number[] = [];

  const getCars = (): void => {
    fetch(baseUrl + Routes.Garage)
      .then<ICar[]>(res => res.json())
      .then(data => {
        setCars(data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getCars();
  }, []);

  const postCar = (car: ICar): void => {
    fetch(baseUrl + Routes.Garage, {
      method: Methods.POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    })
      .then<ICar>(res => res.json())
      .then((data) => {
        setCars((prevCars) => [...prevCars, data]);
      })
      .catch(err => console.log(err));
  };

  const handleCreateCars = (): void => {
    for (let i = 0; i < CARS_COUNT; i++) {
      postCar(generateCar());
    }
  };

  const carRemove = (car: ICar): void => {
    fetch(baseUrl + Routes.Garage + '/' + car.id, {
      method: Methods.DELETE,
    })
      .then(res => res.json())
      .then(() => {
        setCars(cars.filter(c => c.id !== car.id));
      }).catch(err => console.log(err));
  };

  const startDrive = async (id: number): Promise<void> => {
    try {
      const res = await fetch(baseUrl + Routes.Engine + `?id=${id}&status=drive`, {
        method: Methods.PATCH,
      });
      if (res.status === 200) {
        // const data = await res.json();
        // will get time of car
      }
      if (res.status === 500) {
        console.log('Car is broken');
        brokenCarIds.push(id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const animatePosition = useCallback((id: number, distance: number, velocity: number): void => {
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
  }, [brokenCarIds]);

  const carStart = (id: number): void => {
    brokenCarIds.splice(brokenCarIds.indexOf(id), 1);
    fetch(baseUrl + Routes.Engine + `?id=${id}&status=started`, {
      method: Methods.PATCH,
    })
      .then<ICarSpeed>(res => res.json())
      .then((speed) => {
        // setCars((prevCars) => prevCars.map(c => (c.id === id ? { ...c, status: 'started', speed } : c)));
        animatePosition(id, speed.distance, speed.velocity);
        startDrive(id);
      })
      .catch(err => console.log(err));
  };

  const carStop = (car: ICar): void => {
    fetch(baseUrl + Routes.Engine + `?id=${car.id}&status=stopped`, {
      method: Methods.PATCH,
    })
      .then<ICarSpeed>(res => res.json())
      .then(() => {
        // setCars((prevCars) => prevCars.map(c => {
        //   if (c.id === car.id) {
        //     c.status = 'stopped';
        //     c.speed = speed;
        //   }
        //   return c;
        // }));
      })
      .catch(err => console.log(err));
  };

  const handleCarChange = (car: ICar, method: CarMethods): void => {
    switch (method) {
      case CarMethods.Start:
        carStart(car.id);
        break;
      case CarMethods.Stop:
        carStop(car);
        break;
      case CarMethods.Remove:
        carRemove(car);
    }
  };



  // useEffect(() => {
  // if (car?.status === 'drive' && car?.speed) {
  //   const carIcon = document.getElementById(car.id.toString());
  //   if (carIcon) {
  //     animatePosition(carIcon, car.speed.distance, car.speed.velocity / 10);
  //   }
  // }
  // }, []);

  return (
        <section className="container-fluid">
            <h3>Garage ({cars.length})</h3>
            <button className="btn" onClick={handleCreateCars}>Create 100 cars</button>
            {/*<button className="btn" onClick={handleStartRace}>Start Race</button>*/}
            <Cars cars={cars} onChange={handleCarChange}/>
        </section>
  );
};

export default Garage;
