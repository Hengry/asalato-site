import cloneDeep from 'lodash/cloneDeep';
import range from 'lodash/range';
import get from 'lodash/get';
import {
  Position,
  Technique,
  Solution,
  Mark,
  Beat,
  Tag,
  StartDirection,
  PositionName,
  UpsidePosition,
} from 'interfaces/index';
import { getEntries, getKeys } from 'utils/index';

type Connections = {
  [P in PositionName]?: Technique;
};

const positionConnectionsTable: {
  [P in PositionName]: Connections;
} = {
  inTopHandUpsideShake: {
    inTopHandDownsideShake: '_',
  },
  inTopHandDownsideShake: {
    inTopHandUpsideShake: '_',
    backwardOffHandUpsideShake: 'S',
  },
  forwardOffHandUpsideShake: {
    inTopHandDownsideShake: 'G',
    forwardOffHandDownsideShake: '_',
    airTurnDownsideShake: 'A',
  },
  forwardOffHandDownsideShake: {
    forwardOffHandUpsideShake: '_',
  },
  backwardOffHandUpsideShake: {
    backwardOffHandDownsideShake: '_',
  },
  backwardOffHandDownsideShake: {
    backwardOffHandUpsideShake: '_',
    inBottomHandUpsideShake: 'G',
  },
  inBottomHandUpsideShake: {
    forwardOffHandDownsideShake: 'S',
    inBottomHandDownsideShake: 'C',
  },
  inBottomHandDownsideShake: {
    inBottomHandUpsideShake: '_',
  },
  airTurnUpsideShake: {
    forwardOffHandDownsideShake: '_',
  },
  airTurnDownsideShake: {
    airTurnUpsideShake: '_',
  },
};

const unifyTechnique = (symbol: Technique): Technique => {
  switch (symbol) {
    case 'S':
      return 'C';
    default:
      return symbol;
  }
};

const validate = ({
  leftHandTechnique,
  rightHandTechnique,
  sound,
}: {
  leftHandTechnique?: Technique;
  rightHandTechnique?: Technique;
  sound: boolean;
}): false | Mark => {
  if (!leftHandTechnique || !rightHandTechnique) return false;
  const left = unifyTechnique(leftHandTechnique);
  const right = unifyTechnique(rightHandTechnique);
  switch (`${left}${right}`) {
    case '__':
      return sound && { left: leftHandTechnique, right: rightHandTechnique };
    case '_C':
      return {
        left: leftHandTechnique,
        right: sound ? rightHandTechnique : '_',
      };
    case '_G':
      return sound && { left: leftHandTechnique, right: rightHandTechnique };
    case 'C_':
      return {
        left: sound ? leftHandTechnique : '_',
        right: rightHandTechnique,
      };
    case 'CC': // not sure
      return {
        left: sound ? leftHandTechnique : '_',
        right: sound ? rightHandTechnique : '_',
      };
    case 'CG':
      return sound && { left: '_', right: rightHandTechnique };
    case 'G_':
      return sound && { left: leftHandTechnique, right: rightHandTechnique };
    case 'GC':
      return sound && { left: leftHandTechnique, right: '_' };
    case 'GG':
      return sound && { left: leftHandTechnique, right: rightHandTechnique };
    case 'A_':
      return sound && { left: leftHandTechnique, right: rightHandTechnique };
    case 'AC':
      return sound && { left: leftHandTechnique, right: '_' };
    case 'AG':
      return sound && { left: leftHandTechnique, right: rightHandTechnique };
    case 'AA':
      return sound && { left: leftHandTechnique, right: rightHandTechnique };
    case '_A':
      return sound && { left: leftHandTechnique, right: rightHandTechnique };
    case 'CA':
      return sound && { left: '_', right: rightHandTechnique };
    case 'GA':
      return sound && { left: leftHandTechnique, right: rightHandTechnique };
    default:
      throw new Error('illegal rhythm');
  }
};

const findNextPositions = (
  lastPosition: Position,
  sound: boolean
): Array<Beat> => {
  const { left, right } = lastPosition;
  const possibleCandidates: Array<Beat> = [];
  const a = getEntries(positionConnectionsTable[left]);
  a.forEach((vv) => 1);
  getEntries(positionConnectionsTable[left]).forEach(
    ([leftHandPosition, leftHandTechnique]) => {
      getEntries(positionConnectionsTable[right]).forEach(
        ([rightHandPosition, rightHandTechnique]) => {
          const next = validate({
            leftHandTechnique,
            rightHandTechnique,
            sound,
          });
          if (next) {
            possibleCandidates.push({
              mark: next,
              position: {
                left: leftHandPosition,
                right: rightHandPosition,
              },
            });
          }
        }
      );
    }
  );
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
    : cloneDeep(candidate.concat(reverse(candidate)).concat(candidate)); // incase of one side is all heli

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

const way = (p: number) => {
  switch (p) {
    case 0:
    case 4:
      return 'b';
    case 2:
    case 6:
    case 9:
    default:
      return 'f';
  }
};
const getDirection = (position: Position): StartDirection => {
  const left = way(position.left);
  const right = way(position.right);

  if (left !== right) return 'twoWay';
  else if (left === 'f') return 'forward';
  else return 'backward';
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
      startPosition: start,
      tags: [getDirection(start), symmetry ? 'symmetry' : 'antisymmetry'],
    };
  });

const filterCyclic = (candidates: Array<Beat>[]): Array<Beat>[] =>
  candidates.filter((candidate) => {
    const start = candidate[0]?.position;
    const end = candidate[candidate.length - 1]?.position;
    return (
      (start.left === end.right && start.right === end.left) ||
      (start.left === end.left && start.right === end.right)
    );
    // sym cycle: start.left === end.left && start.right === end.right
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
  preferGrab?: boolean;
};

const resolveTechniques = (rhythm: string) => {
  const startPositions = Object.keys(positionConnectionsTable).filter((name) =>
    name.includes('UpsideShake')
  ) as UpsidePosition[];

  // initial
  let candidates: Array<Beat[]> = [];
  startPositions.forEach((leftHandPosition) => {
    startPositions.forEach((rightHandPosition) => {
      candidates.push([
        {
          mark: {
            left: '_',
            right: '_',
          },
          position: {
            left: leftHandPosition,
            right: rightHandPosition,
          },
        },
      ]);
    });
  });

  // BFS
  for (let i = 0; i !== rhythm.length; i += 1) {
    const beat = rhythm[i];
    const nextCandidates: Array<Beat[]> = [];
    candidates.forEach((candidate) => {
      const lastBeat = candidate[candidate.length - 1];
      const nextPossibleBeats: Array<Beat> = findNextPositions(
        lastBeat.position,
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

  return candidates;
};

const injectTags = (solutions: Solution[]): Solution[] =>
  solutions.map((solution) => {
    const { text, tags } = solution;
    const newTags: Tag[] = [...tags];
    {
      const { left, right } = text;
      if (left.includes('C') || right.includes('C')) newTags.push('click');
      if (left.includes('A') || right.includes('A')) newTags.push('airTurn');
    }
    return { ...solution, tags: newTags };
  });

export const findPath = (
  rhythm: string = '',
  options: Options = {}
): Solution[] => {
  const { preferGrab = false } = options;
  const candidates = resolveTechniques(rhythm);
  const finalCandidates = filterCyclic(candidates);
  const solutions = candidates2Solutions(finalCandidates, preferGrab);
  const filtered = filterRedundantSolutions(solutions);
  const injected = injectTags(filtered);
  return injected;
};
