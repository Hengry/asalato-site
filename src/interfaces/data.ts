export type Symbol = 'G' | 'S' | 'F' | 'C' | '_' | 'A';
export type Mark = {
  left: Symbol;
  right: Symbol;
};
export type Position = {
  left: number;
  right: number;
};
export type Beat = {
  mark: Mark;
  position: Position;
};
type startDirection = 'forward' | 'backward' | 'twoWay';
type cycle = 'asymmetry' | 'symmetry';
export type Tag = 'airTurn' | 'click' | startDirection | cycle;
export type Solution = {
  path: Array<Beat>;
  text: {
    left: string;
    right: string;
  };
  tags: Tag[];
};
