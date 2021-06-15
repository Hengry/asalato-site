import React, { useCallback, useMemo, useState } from 'react';
import { Dialog } from '@headlessui/react';

import { findPath } from 'utils/rythm';
import Tool from './Tool';
import ToolPanel from './ToolPanel';
import Note from 'components/Note';
import Notation from 'components/Notation';

interface ResolverProps {
  input: string;
}

const Resolver = (props) => {
  const { onClick, input } = props;
  const [open, setOpen] = useState(false);

  // const solutions = useMemo(() => {
  //   return findPath(input, {});
  // }, []);
  // console.log(solutions);
  const handleClicked = useCallback(() => {
    onClick();
    setOpen(true);
  }, []);
  return (
    <>
      <div
        className="rounded-full w-6 h-6 bg-main flex items-center justify-center"
        onClick={handleClicked}
      >
        A
      </div>
      <Dialog
        open={open}
        onClose={() => {
          console.log('d close');
          setOpen(false);
        }}
      >
        <Dialog.Overlay className="bg-black opacity-30 fixed inset-0" />
        <Dialog.Title className="absolute z-10 top-0 inset-x-0 m-4">
          <Note title="test" />
        </Dialog.Title>
        <Dialog.Description className="rounded absolute z-10 bg-surface top-16 bottom-0 inset-x-0 m-4 p-2">
          <Notation values={['X']} />
          <button className="bg-main" onClick={() => setOpen(false)}>
            Deactivate
          </button>
          <button onClick={() => setOpen(false)}>Cancel</button>
        </Dialog.Description>
      </Dialog>
    </>
  );
};

export default Resolver;
