export type Technique = 'G' | 'S' | 'F' | 'C' | '_' | 'A';
export type Mark = {
  left: Technique;
  right: Technique;
};

type BallPosition =
  | 'inTopHand'
  | 'forwardOffHand'
  | 'backwardOffHand'
  | 'inBottomHand'
  | 'airTurn';
export type UpsidePosition = `${BallPosition}UpsideShake`;
export type DownsidePosition = `${BallPosition}DownsideShake`;
export type PositionName = UpsidePosition | DownsidePosition;

export type Position = {
  left: PositionName;
  right: PositionName;
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
