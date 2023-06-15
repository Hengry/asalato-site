import { findPath } from './rhythm';

onmessage = (msg) => {
  const path = findPath(msg.data.rhythm, msg.data.options);
  postMessage(path);
};
