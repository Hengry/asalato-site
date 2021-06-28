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
export type StartDirection = 'forward' | 'backward' | 'twoWay';
export type Cycle = 'antisymmetry' | 'symmetry';
export type Tag = 'airTurn' | 'click' | StartDirection | Cycle;
export type Solution = {
  path: Array<Beat>;
  text: {
    left: string;
    right: string;
  };
  startPosition: Position;
  tags: Tag[];
};
