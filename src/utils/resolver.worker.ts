import { findPath } from './rythm';

onmessage = (msg) => {
  const path = findPath(msg.data.rythm, msg.data.options);
  postMessage(path);
};
