export enum Tabs {
  Garage = 'garage',
  Winners = 'winners',
}

export interface StopAnimate {
  id: number;
  stopAnimate: () => void;
}

export enum FilterStatus {
  default = 'default',
  asc = 'asc',
  desc = 'desc',
}

export enum Routes {
  Garage = '/garage',
  Winners = '/winners',
  Engine = '/engine',
}

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}
