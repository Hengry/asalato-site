import { findPath } from '../features/rhythm';

onmessage = (msg) => {
  const path = findPath(msg.data.rhythm, msg.data.options);
  postMessage(path);
};
