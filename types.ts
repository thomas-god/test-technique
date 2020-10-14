export interface ProdData {
  start: number;
  end: number;
  power: number;
}

export interface CentraleProdData {
  name: string;
  prod: ProdData[];
}
