import React from 'react';
import { Popover } from '@headlessui/react';

import { findPath } from 'utils/rythm';
import Tool from './Tool';
import ToolPanel from './ToolPanel';
import Note from 'components/Note';

const Solver = (props) => {
  return (
    <Popover>
      <Tool>A</Tool>
      <Popover.Overlay className="bg-black opacity-30 fixed inset-0" />
      <Popover.Panel className="absolute z-10 top-0 inset-0 m-4">
        <Note title="test" />
      </Popover.Panel>
      <ToolPanel>
        <div>123</div>
      </ToolPanel>
    </Popover>
  );
};

export default Solver;
