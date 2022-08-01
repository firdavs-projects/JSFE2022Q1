import React, { FC } from 'react';
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
  return (
        <div>
            <div className="cars">
                {dataPaginated.map(car => (
                    <Car key={car.id} car={car} onChange={onChange} fetching={fetching}/>
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
