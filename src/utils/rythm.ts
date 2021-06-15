import cloneDeep from 'lodash/cloneDeep';
import range from 'lodash/range';
import get from 'lodash/get';
import { Position, Symbol, Solution, Mark, Beat } from 'interfaces/data';

type TableOptions = {
  withAirTurn?: boolean;
  withClick?: boolean;
};
export const getPositionTable = ({
  withAirTurn,
  withClick,
}: TableOptions): Symbol[][] => {
  const positionTable: Symbol[][] = new Array(withAirTurn ? 11 : 8)
    .fill(undefined)
    .map(() => []);
  positionTable[0][1] = '_';
  positionTable[1][0] = '_';
  positionTable[1][4] = 'S';
  positionTable[2][1] = 'G';
  positionTable[2][3] = '_';
  positionTable[3][2] = '_';
  positionTable[4][5] = '_';
  positionTable[5][4] = '_';
  positionTable[5][6] = 'G';
  positionTable[6][3] = 'S';
  positionTable[6][7] = withClick ? 'C' : '_';
  positionTable[7][6] = '_';

  if (withAirTurn) {
    positionTable[2][8] = 'A';
    positionTable[8][9] = '_';
    positionTable[9][10] = '_';
    positionTable[10][2] = '_';
  }
  return positionTable;
};

const unifySymbol = (symbol: Symbol): Symbol => {
  switch (symbol) {
    case 'S':
      return 'C';
    default:
      return symbol;
  }
};

const validate = ({
  leftSymbol,
  rightSymbol,
  sound,
}: {
  leftSymbol: Symbol;
  rightSymbol: Symbol;
  sound: boolean;
}): [boolean, Mark?] => {
  const left = unifySymbol(leftSymbol);
  const right = unifySymbol(rightSymbol);
  switch (`${left}${right}`) {
    case '__':
      return [!sound, { left: leftSymbol, right: rightSymbol }];
    case '_C':
      return [true, { left: leftSymbol, right: sound ? rightSymbol : '_' }];
    case '_G':
      return [sound, { left: leftSymbol, right: rightSymbol }];
    case 'C_':
      return [true, { left: sound ? leftSymbol : '_', right: rightSymbol }];
    case 'CC': // not sure
      return [
        true,
        { left: sound ? leftSymbol : '_', right: sound ? rightSymbol : '_' },
      ];
    case 'CG':
      return [sound, { left: '_', right: rightSymbol }];
    case 'G_':
      return [sound, { left: leftSymbol, right: rightSymbol }];
    case 'GC':
      return [sound, { left: leftSymbol, right: '_' }];
    case 'GG':
      return [sound, { left: leftSymbol, right: rightSymbol }];
    case 'A_':
      return [sound, { left: leftSymbol, right: rightSymbol }];
    case 'AC':
      return [sound, { left: leftSymbol, right: '_' }];
    case 'AG':
      return [sound, { left: leftSymbol, right: rightSymbol }];
    case 'AA':
      return [sound, { left: leftSymbol, right: rightSymbol }];
    case '_A':
      return [sound, { left: leftSymbol, right: rightSymbol }];
    case 'CA':
      return [sound, { left: '_', right: rightSymbol }];
    case 'GA':
      return [sound, { left: leftSymbol, right: rightSymbol }];
    default:
      throw new Error('illegal rythm');
  }
};

const findNextPositions = (
  lastPosition: Position,
  positionTable: Symbol[][],
  sound: boolean
): Array<Beat> => {
  const { left, right } = lastPosition;
  const possibleCandidates: Array<Beat> = [];
  positionTable[left].forEach((leftSymbol, li) => {
    positionTable[right].forEach((rightSymbol, ri) => {
      const [valid, next]: [boolean, Mark?] = validate({
        leftSymbol,
        rightSymbol,
        sound,
      });
      if (valid && next) {
        possibleCandidates.push({
          mark: next,
          position: {
            left: li,
            right: ri,
          },
        });
      }
    });
  });
  return possibleCandidates;
};

const reverse = (candidate: Array<Beat>) =>
  candidate.map(({ mark, position }) => ({
    mark: {
      left: mark.right,
      right: mark.left,
    },
    position: {
      left: position.right,
      right: position.left,
    },
  }));

// all use G except F__F
// FIXME: no revise position
const preferG = (candidate: Array<Beat>, symmetry: boolean): Array<Beat> => {
  const base = symmetry
    ? cloneDeep(candidate.concat(candidate))
    : cloneDeep(candidate.concat(reverse(candidate)).concat(candidate));

  const revised = base.map(({ mark: { left, right }, ...rest }, i) => {
    let newLeft = left;
    let newRight = right;
    if (left === 'G') {
      const critical = get(base, [i + 3, 'mark', 'left']);
      if (critical === 'F' || critical === 'G') newLeft = 'F';
    }
    if (right === 'G') {
      const critical = get(base, [i + 3, 'mark', 'right']);
      if (critical === 'F' || critical === 'G') newRight = 'F';
    }
    return {
      mark: {
        left: newLeft,
        right: newRight,
      },
      ...rest,
    };
  });

  return revised.slice(0, candidate.length);
};

// all use F except S or C after G
const preferF = (candidate: Array<Beat>, symmetry: boolean): Array<Beat> => {
  const base = symmetry
    ? cloneDeep(candidate.concat(candidate))
    : cloneDeep(candidate.concat(reverse(candidate)).concat(candidate));

  const revised: Array<Beat> = base.map(
    ({ mark: { left, right }, ...rest }) => ({
      ...rest,
      mark: {
        left: left === 'G' ? 'F' : left,
        right: right === 'G' ? 'F' : right,
      },
    })
  );

  let lastLeftMark = '';
  let lastLeftIndex = 0;
  let lastRightMark = '';
  let lastRightIndex = 0;
  for (let i = 0; i !== revised.length - 1; i += 1) {
    const {
      mark: { left, right },
    } = revised[i];
    if (left !== '_') {
      if (lastLeftMark === 'F' && (left === 'S' || left === 'C')) {
        revised[lastLeftIndex].mark.left = 'G';
        range(lastLeftIndex + 1, i).forEach((index) => {
          const { left: value } = revised[index].position;
          revised[index].position.left = value < 4 ? value + 4 : value - 4;
        });
      }

      lastLeftMark = left;
      lastLeftIndex = i;
    }
    if (right !== '_') {
      if (lastRightMark === 'F' && (right === 'S' || right === 'C')) {
        revised[lastRightIndex].mark.right = 'G';
        range(lastRightIndex + 1, i).forEach((index) => {
          const { right: value } = revised[index].position;
          revised[index].position.right = value < 4 ? value + 4 : value - 4;
        });
      }
      lastRightMark = right;
      lastRightIndex = i;
    }
  }

  return revised.slice(0, candidate.length);
};

const candidates2Solutions = (
  candidates: Array<Beat>[],
  preferGrab: boolean
): Solution[] =>
  candidates.map((path) => {
    const start = path[0].position;
    const end = path[path.length - 1].position;
    const symmetry = start.left === end.left && start.right === end.right;
    const revisedPath = preferGrab
      ? preferG(path.slice(1), symmetry)
      : preferF(path.slice(1), symmetry);

    return {
      path: revisedPath,
      text: {
        left: revisedPath.map(({ mark }) => mark.left).join(''),
        right: revisedPath.map(({ mark }) => mark.right).join(''),
      },
      symmetry,
    };
  });

const findCandidateseEndAsStart = (
  candidates: Array<Beat>[],
  { asymmetryCycle }: { asymmetryCycle?: boolean }
): Array<Beat>[] =>
  candidates.filter((candidate) => {
    const start = candidate[0]?.position;
    const end = candidate[candidate.length - 1]?.position;
    return asymmetryCycle
      ? (start.left === end.right && start.right === end.left) ||
          (start.left === end.left && start.right === end.right)
      : start.left === end.left && start.right === end.right;
  });

const checkRepeat = (solution: Solution, filtered: Solution[]): boolean => {
  const {
    text: { left, right },
  } = solution;
  return filtered.some(
    (existing) =>
      (right === existing.text.left && left === existing.text.right) ||
      (right === existing.text.right && left === existing.text.left)
  );
};

const filterRedundantSolutions = (solutions: Solution[]): Solution[] => {
  const filtered: Solution[] = [];
  solutions.forEach((solution) => {
    const isRepeated = checkRepeat(solution, filtered);
    if (!isRepeated) filtered.push(solution);
  });
  return filtered;
};

type Options = {
  withAirTurn?: boolean;
  withClick?: boolean;
  onlyStartInForward?: boolean;
  simplify?: boolean;
  asymmetryCycle?: boolean;
  preferGrab?: boolean;
};

export const findPath = (
  rythm: string = '',
  options: Options = {}
): Solution[] => {
  const {
    withAirTurn = false,
    withClick = true,
    onlyStartInForward = false,
    asymmetryCycle = false,
    preferGrab = false,
  } = options;

  const startPositions = onlyStartInForward ? [2, 6] : [2, 6, 0, 4];
  const positionTable = getPositionTable({ withAirTurn, withClick });

  let candidates: Array<Beat[]> = [];
  startPositions.forEach((left) => {
    startPositions.forEach((right) => {
      candidates.push([
        {
          mark: {
            left: '_',
            right: '_',
          },
          position: {
            left,
            right,
          },
        },
      ]);
    });
  });

  for (let i = 0; i !== rythm.length; i += 1) {
    const beat = rythm[i];
    const nextCandidates: Array<Beat[]> = [];
    candidates.forEach((candidate) => {
      const lastBeat = candidate[candidate.length - 1];
      const nextPossibleBeats: Array<Beat> = findNextPositions(
        lastBeat.position,
        positionTable,
        !(beat === '0' || beat === '_')
      );
      nextPossibleBeats.forEach((nextBeat) => {
        const { mark, position } = nextBeat;

        const nextCandidate: Beat[] = [
          ...cloneDeep(candidate),
          {
            mark,
            position,
          },
        ];
        nextCandidates.push(nextCandidate);
      });
    });
    candidates = nextCandidates;
  }

  const finalCandidates = findCandidateseEndAsStart(candidates, {
    asymmetryCycle,
  });
  const solutions = candidates2Solutions(finalCandidates, preferGrab);
  const filtered = filterRedundantSolutions(solutions);
  return filtered;
};
