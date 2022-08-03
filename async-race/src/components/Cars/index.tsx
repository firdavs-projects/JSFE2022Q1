import React, { FC, useState } from 'react';
import { usePagination } from '../../hooks/usePagination';
import { CarMethods, ICar } from '../../types/car';
import { CARS_LIMIT } from '../../utils/constants';
import Car from '../Car';

interface Props {
  cars: ICar[];
  onChange: (car: ICar, method: CarMethods) => void;
  fetching: number[];
}

const Cars: FC<Props> = ({ cars, onChange, fetching }) => {
  const [page, pages, dataPaginated, nextPage, prevPage] = usePagination<ICar>(cars, CARS_LIMIT);
  const [isStarted, setIsStarted] = useState<number[]>([]);
  const race = (method: CarMethods): void => {
    dataPaginated.forEach(car => onChange(car, method));
    switch (method) {
      case CarMethods.Race:
        setIsStarted([...cars.map(c=>c.id)]);
        break;
      case CarMethods.Reset:
        setIsStarted([]);
        break;
      default:
        break;
    }
  };

  return (
     <div>
       <div className="d-flex mt-1">
         <button
           disabled={fetching.length > 0 || isStarted.length > 0}
           className="btn btn-primary mr-1"
           onClick={() => race(CarMethods.Race)}
         >
           Start Race
         </button>
         <button
           disabled={fetching.length > 0 || isStarted.length === 0}
           className="btn btn-outline-danger"
           onClick={() => race(CarMethods.Reset)}
         >
           Reset
         </button>
       </div>
       <div className="cars">
         {dataPaginated.map(car => (
           <Car key={car.id} car={car} onChange={onChange} fetching={fetching} raceState={[isStarted, setIsStarted]} />
         ))}
       </div>
       <div className="my-5">
         <button disabled={page === 1} className="btn btn-outline-primary" onClick={prevPage}>Prev</button>
         <span className="mx-2">{page} of {pages}</span>
         <button disabled={page === pages} className="btn btn-outline-primary" onClick={nextPage}>Next</button>
       </div>
     </div>
  );
};

export default Cars;
