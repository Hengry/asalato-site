import React from 'react';
import { Popover } from '@headlessui/react';

import { findPath } from 'utils/rythm';
import Tool from './Tool';

const Solver = (props) => {
  return (
    <Popover>
      <Popover.Button>
        <Tool>A</Tool>
      </Popover.Button>
      <Popover.Panel>
        <div>123</div>
      </Popover.Panel>
    </Popover>
  );
};

export default Solver;
