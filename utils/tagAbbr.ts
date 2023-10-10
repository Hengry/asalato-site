import { Tag } from '@/interfaces/data';

// change to icons in the future
export default function tagAbbr(tag: string) {
  switch (tag) {
    case 'forward':
      return 'f';
    case 'backward':
      return 'b';
    case 'twoWay':
      return 't';
    case 'antisymmetry':
      return 'ant';
    case 'symmetry':
      return 'sym';
    case 'airTurn':
      return 'a';
    case 'click':
      return 'c';
    default:
      return 'x';
  }
}
