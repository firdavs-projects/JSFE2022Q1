import React, { FC } from 'react';
import { ICar, IWinner } from '../../types/car';
import { WINNERS_LIMIT } from '../../utils/constants';
import CarIcon from '../CarIcon';
import { FilterStatus } from '../../types';

interface Props {
  winners: IWinner[];
  cars: ICar[];
  page: number;
  byWins: () => void;
  byTime: () => void;
  winsStatus: FilterStatus;
  timeStatus: FilterStatus;
}

const WinnersTable: FC<Props> = ({ winners, cars, page, byWins, byTime, winsStatus, timeStatus }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Position</th>
          <th scope="col">Car</th>
          <th scope="col">Name</th>
          <th scope="col" className="pointer" onClick={byWins}>Wins {winsStatus}</th>
          <th scope="col" className="pointer" onClick={byTime}>Best time (seconds) {timeStatus}</th>
        </tr>
      </thead>
      <tbody>
      {winners.map((winner, i) => (
        <tr key={i}>
          <th scope="row">{(i + 1) + ((page - 1) * WINNERS_LIMIT)}</th>
          <td className="position-relative">
            <CarIcon
              className="win-table-car"
              color={`${cars.find(car => car.id === winner.id)?.color}`}
              id={`${Math.random()}`}
            />
          </td>
          <td>{cars.find(car => car.id === winner.id)?.name}</td>
          <td>{winner.wins}</td>
          <td>{winner.time}</td>
        </tr>),
      )}
      </tbody>
    </table>
  );
};

export default WinnersTable;
