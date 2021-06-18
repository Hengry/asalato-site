import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Dialog } from '@headlessui/react';

import { findPath } from 'utils/rythm';
import Tool from './Tool';
import ToolPanel from './ToolPanel';
import Note from 'components/Note';
import Notation from 'components/Notation';
import { Solution } from 'interfaces/data';

interface ResolverProps {
  rythm: string;
}

const Resolver = (props: ResolverProps) => {
  const { rythm } = props;
  const [solution, setSolution] = useState<Solution[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (rythm) {
      setLoading(true);
      const path = findPath(rythm);
      setSolution(path);
      setLoading(false);
    }
  }, [rythm]);
  console.log(solution);
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Dialog.Overlay className="bg-black opacity-30 fixed inset-0" />
      <Dialog.Title className="absolute z-10 top-0 inset-x-0 m-4">
        <Note title="test" />
      </Dialog.Title>
      <div className="rounded absolute z-10 bg-surface top-16 bottom-0 inset-x-0 m-4 p-2">
        <Notation values={['X']} />
        <button className="bg-main" onClick={() => setOpen(false)}>
          Deactivate
        </button>
        <button onClick={() => setOpen(false)}>Cancel</button>
      </div>
    </Dialog>
  );
};

export default Resolver;
