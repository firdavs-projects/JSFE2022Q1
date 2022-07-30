import React, { FC } from 'react';
import { usePagination } from '../../hooks/usePagination';
import { Tabs } from '../../types';
import { CarMethods, ICar } from '../../types/car';
import { CARS_LIMIT } from '../../utils/constants';
import Car from '../Car';

interface Props {
  cars: ICar[];
  onChange: (car: ICar, method: CarMethods) => void;
}

const Cars: FC<Props> = ({ cars, onChange }) => {
  const [page, pages, dataPaginated, nextPage, prevPage] = usePagination<ICar>(cars, CARS_LIMIT, Tabs.Garage);
  return (
        <div>
            <div className="cars">
                {dataPaginated.map(car => (
                    <Car key={car.id} car={car} onChange={onChange}/>
                ))}
            </div>
            <div className="my-5">
                <button disabled={page === 1} className="btn btn-primary" onClick={prevPage}>Prev</button>
                <span className="mx-2">{page} of {pages}</span>
                <button disabled={page === pages} className="btn btn-primary" onClick={nextPage}>Next</button>
            </div>
        </div>

  );
};

export default Cars;
