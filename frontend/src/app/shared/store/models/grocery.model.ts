export interface Grocery {
  count: number;
  done: boolean;
  name: string;
  _id?: number;
}

export interface ItemToRemove extends Grocery {
  index: number;
}
