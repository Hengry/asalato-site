import { findPath } from './rythm';

onmessage = (msg) => {
  const path = findPath(msg.data);
  postMessage(path);
};
