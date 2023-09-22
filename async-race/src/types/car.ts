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
  Race = 'RACE',
  Reset = 'RESET',
}

export type IDriveInfo = {
  distance: number;
  velocity: number;
  id?: number;
};

export enum IFormMethods {
  Create = 'CREATE',
  Update = 'UPDATE',
}
