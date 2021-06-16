import React, { useEffect, useMemo, useState } from 'react';
import { Dialog } from '@headlessui/react';
import Note from 'components/Note';
import { findPath } from 'utils/rythm';

interface SolutionTableProps {
  rythm: string;
  onClose: () => void;
}

const SolutionPanel = (props: SolutionTableProps) => {
  const { rythm, onClose } = props;
  const solutions = useMemo(() => {
    return rythm ? findPath(rythm) : [];
  }, []);
  return (
    <Dialog open={Boolean(rythm)} onClose={() => {}}>
      <Dialog.Description>
        <Note title="AAA" />
        <button onClick={onClose}>test</button>
      </Dialog.Description>
    </Dialog>
  );
};

export default SolutionPanel;
