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
  const [rythm, setRythm] = useState(propsRythm);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [openSolutionPanel, setOpenSolutionPanel] = useState<boolean>(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    console.log('rythm', rythm);
    if (rythm) {
      setOpen(true);
      setLoading(true);
      const path = findPath(rythm);
      setSolutions(path);
      setOpenSolutionPanel(true);
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

  const handleInputClick = useCallback(
    (s: 'X' | '_') => () => {
      setInput((prev) => prev + s);
    },
    []
  );

  const handleSubmit = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log('sub');
    const target = e.target as typeof e.target & {
      input: { value: string };
    };
    setRythm(target.input.value);
  }, []);

  return (
    <>
      <div
        className="rounded-full w-16 h-16 bg-main flex items-center justify-center"
        onClick={handleClicked}
      />
      <Dialog
        as="form"
        autoComplete="off"
        onSubmit={handleSubmit}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Dialog.Overlay className="bg-black opacity-30 fixed inset-0" />
        <Dialog.Title className="rounded-xl absolute z-10 bg-surface top-0 inset-x-0 m-4 h-20 p-4">
          <Input value={input} onChange={handleChange} />
          <div className="flex justify-end">
            <button className="rounded p-1">setting</button>
          </div>
        </Dialog.Title>
        {!openSolutionPanel && (
          <div className="bottom-0 absolute z-10 inset-x-0 m-2">
            <div className="flex justify-between">
              <button
                type="button"
                className="rounded-3xl inline-block bg-surface h-24 w-24 m-2"
                onClick={handleInputClick('_')}
              >
                _
              </button>
              <button
                type="button"
                className="rounded-3xl inline-block bg-surface h-24 w-24 m-2"
                onClick={handleInputClick('X')}
              >
                X
              </button>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="rounded-3xl inline-block bg-surface h-24 w-24 m-2"
              >
                back-space
              </button>
            </div>
          </div>
        )}
        {openSolutionPanel && (
          <div className="rounded-xl absolute z-10 bg-surface top-24 bottom-24 inset-x-0 m-4 p-2 mb-8">
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
        )}
        <div className="flex justify-between absolute bottom-0 inset-x-0 m-2">
          <button
            type="button"
            className="rounded-3xl inline-block bg-surface h-24 w-24 m-2"
          >
            Close
          </button>
          <button
            type="button"
            className="rounded-3xl inline-block bg-surface h-24 w-24 m-2"
            onClick={() => {
              setInput('');
              setOpenSolutionPanel(false);
            }}
          >
            Reset
          </button>
          <button
            type="submit"
            className="rounded-3xl inline-block bg-surface h-24 w-24 m-2"
          >
            gogo
          </button>
        </div>
      </Dialog>
    </>
  );
};
Resolver.defaultProps = {
  rythm: '',
};

export default Resolver;
