import React, { FC, useEffect, useState } from 'react';
import { ICar, IWinner } from '../../types/car';
import { usePagination } from '../../hooks/usePagination';
import { WINNERS_LIMIT } from '../../utils/constants';
import { getWinners } from '../../api/winners';
import { getCars } from '../../api/garage';
import { Tabs } from '../../types';
import WinnersTable from '../WinnersTable';
import { useFilter } from '../../hooks/useFilter';

const Winners: FC<{ tab: Tabs }> = ({ tab }) => {
  const [winners, setWinners] = useState<IWinner[]>([]);
  const [setWinnersWithFilters, byWins, byTime, winsStatus, timeStatus] = useFilter(winners, setWinners);
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
      getWinners().then(setWinnersWithFilters);
      getCars().then(setCars);
    }
  }, [tab]);

  return (
        <section className="container-fluid">
          <h3>Winners ({winners.length})</h3>
          <WinnersTable
            winners={dataPaginated}
            cars={cars}
            page={page}
            byWins={byWins}
            byTime={byTime}
            winsStatus={winsStatus}
            timeStatus={timeStatus}
          />
          <div className="d-flex my-4">
            <button disabled={page === 1} className="btn btn-primary" onClick={prevPage}>Prev</button>
            <span className="mx-2">{page} of {pages}</span>
            <button disabled={page === pages} className="btn btn-primary" onClick={nextPage}>Next</button>
          </div>
        </section>
  );
};

export default Winners;
