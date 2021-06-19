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
  const { rythm: propsRythm } = props;
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [rythm, setRythm] = useState(propsRythm);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [input, setInput] = useState('');

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

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newValue = Array.from(value)
      .map((char) => {
        switch (char) {
          case ' ':
          case '_':
          case '0':
          case '-':
            return '_';
          default:
            return 'X';
        }
      })
      .join('');
    setInput(newValue);
  }, []);

  const handleSubmit = useCallback((value: string) => {
    setRythm(value);
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
        <Dialog.Title className="rounded absolute z-10 bg-surface top-0 inset-x-0 m-4">
          <Input
            value={input}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </Dialog.Title>
        <div className="rounded absolute z-10 bg-surface top-16 bottom-0 inset-x-0 m-4 p-2">
          {solutions.map(({ text: { left, right } }) => (
            <Notation key={left + right} values={[left, right]} />
          ))}

          <div className="absolute bottom-0 inset-x-0 p-2 flex justify-end">
            <button
              className="rounded p-1 bg-main mx-1"
              onClick={() => setOpen(false)}
            >
              Deactivate
            </button>
            <button onClick={() => setOpen(false)}>Cancel</button>
          </div>
        </div>
      </Dialog>
    </>
  );
};
Resolver.defaultProps = {
  rythm: '',
};

export default Resolver;
