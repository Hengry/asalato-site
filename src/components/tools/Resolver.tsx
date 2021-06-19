import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Dialog } from '@headlessui/react';

import { findPath } from 'utils/rythm';
import Input from '../Input';
import ToolPanel from './ToolPanel';
import Note from 'components/Note';
import Notation from 'components/Notation';
import { Solution } from 'interfaces/data';

interface ResolverProps {
  rythm?: string;
}

const Resolver = (props: ResolverProps) => {
  const { rythm } = props;
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (rythm) {
      setOpen(true);
      setLoading(true);
      const path = findPath(rythm);
      setSolutions(path);
      setLoading(false);
    }
  }, [rythm]);

  const handleClicked = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <>
      <div
        className="rounded-full w-12 h-12 bg-main flex items-center justify-center"
        onClick={handleClicked}
      >
        A
      </div>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Dialog.Overlay className="bg-black opacity-30 fixed inset-0" />
        <Dialog.Title className="absolute z-10 top-0 inset-x-0 m-4">
          <Input />
        </Dialog.Title>
        <div className="rounded absolute z-10 bg-surface top-16 bottom-0 inset-x-0 m-4 p-2">
          {solutions.map(({ text: { left, right } }) => (
            <Notation key={left + right} values={[left, right]} />
          ))}

          <button className="bg-main" onClick={() => setOpen(false)}>
            Deactivate
          </button>
          <button onClick={() => setOpen(false)}>Cancel</button>
        </div>
      </Dialog>
    </>
  );
};

export default Resolver;
