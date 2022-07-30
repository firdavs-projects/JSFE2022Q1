export interface ICar {
  name: string;
  color: string;
  id: number;
  // status?: string;
  // speed?: ICarSpeed;
  // time?: number;
}

export enum CarMethods {
  Select = 'SELECT',
  Remove = 'REMOVE',
  Start = 'START',
  Stop = 'STOP',
}

export interface ICarSpeed {
  distance: number;
  velocity: number;
}
