import React, { FC, useEffect, useState } from 'react';
import { ICar, IWinner } from '../../types/car';
import { usePagination } from '../../hooks/usePagination';
import { WINNERS_LIMIT } from '../../utils/constants';
import { getWinners } from '../api/winners';
import { getCars } from '../api/garage';
import { Tabs } from '../../types';

const Winners: FC<{ tab: Tabs }> = ({ tab }) => {
  const [winners, setWinners] = useState<IWinner[]>([]);
  const [cars, setCars] = useState<ICar[]>([]);
  const [
    page,
    pages,
    dataPaginated,
    nextPage,
    prevPage,
  ] = usePagination<IWinner>(winners, WINNERS_LIMIT);

  useEffect(() => {
    if (tab === Tabs.Winners) {
      getWinners(setWinners);
      getCars(setCars);
    }
  }, [tab]);

  return (
        <section className="container-fluid">
          <h3>Winners</h3>
          <div className="winners">
            {dataPaginated.map((winner, i) => (
              <div key={winner.id}>
                  {i + 1} | {cars.find(car => car.id === winner.id)?.name} | {winner.time}s | {winner.wins}wins
              </div>
            ))}
          </div>
          <div className="d-flex">
            <button disabled={page === 1} className="btn btn-outline-primary" onClick={prevPage}>Prev</button>
            {page} of {pages}
            <button disabled={page === pages} className="btn btn-outline-primary" onClick={nextPage}>Next</button>
          </div>
        </section>
  );
};

export default Winners;
