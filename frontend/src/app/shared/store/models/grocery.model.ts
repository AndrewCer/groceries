export interface Grocery {
  count: number;
  done: boolean;
  name: string;
  _id?: number;
}

export interface ItemWithIndex extends Grocery {
  index: number;
}
