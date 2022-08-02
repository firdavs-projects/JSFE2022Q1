export interface ICar {
  name: string;
  color: string;
  id: number;
}

export interface IWinner {
  wins: number;
  time: number;
  id: number;
  lastTime?: number;
}

export enum CarMethods {
  Select = 'SELECT',
  Remove = 'REMOVE',
  Start = 'START',
  Stop = 'STOP',
  RaceStart = 'RACE',
  Reset = 'RESET',
}

export interface ICarSpeed {
  distance: number;
  velocity: number;
}

export enum IFormMethods {
  Create = 'CREATE',
  Update = 'UPDATE',
}
