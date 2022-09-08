import { IWinner } from '../types/car';
import { useEffect, useState } from 'react';
import { FilterStatus } from '../types';

export const useFilter = (
  data: IWinner[],
  setData: (data: IWinner[]) => void,
): [
  setWinnersWithFilters: (data: IWinner[]) => void,
  filterByWins: () => void,
  filterByTime: () => void,
  wins: FilterStatus,
  time: FilterStatus,
  ] => {
  const [wins, setWins] = useState(FilterStatus.default);
  const [time, setTime] = useState(FilterStatus.default);

  const setWinnersWithFilters = (winners: IWinner[]): void => {
    if (wins !== FilterStatus.default) {
      setData(
        [...winners.sort((a, b) =>
          wins === FilterStatus.desc ? a.wins - b.wins : b.wins - a.wins)],
      );
    }
    if (time !== FilterStatus.default) {
      setData(
        [...winners.sort((a, b) =>
          time === FilterStatus.asc ? a.time - b.time : b.time - a.time)],
      );
    }
    if (wins === FilterStatus.default && time === FilterStatus.default) {
      setData(winners);
    }
  };

  useEffect(() => {
    setWinnersWithFilters(data);
  }, [wins, time]);

  useEffect(() => {
    setTime(time);
    setWins(wins);
  }, [data]);

  const filterByWins = (): void => {
    setTime(FilterStatus.default);
    if (wins === FilterStatus.default) {
      setWins(FilterStatus.asc);
      return;
    }
    setWins(wins === FilterStatus.asc ? FilterStatus.desc : FilterStatus.asc);
  };

  const filterByTime = (): void => {
    setWins(FilterStatus.default);
    if (time === FilterStatus.default) {
      setTime(FilterStatus.asc);
      return;
    }
    setTime(time === FilterStatus.asc ? FilterStatus.desc : FilterStatus.asc);
  };

  return [
    setWinnersWithFilters,
    filterByWins,
    filterByTime,
    wins,
    time,
  ];
};
