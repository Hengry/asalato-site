import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Dialog } from '@headlessui/react';
import styled from '@emotion/styled';

import { findPath } from 'utils/rythm';
import PanelButton from 'components/PanelButton';
import SettingIcon from 'components/icons/SettingIcon';
import { Solution } from 'interfaces/data';

import SolutionPanel from './SolutionPanel';

import ResolverWorker from 'utils/resolver.worker';

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
    if (rythm) {
      setOpen(true);
      setLoading(true);
      setOpenSolutionPanel(false);

      if (window.Worker) {
        const worker = new ResolverWorker();
        worker.onmessage = (msg: MessageEvent) => {
          setLoading(false);
          setSolutions(msg.data);
          setOpenSolutionPanel(true);
        };

        worker.postMessage(rythm);
      } else {
        const result = findPath(rythm);
        setLoading(false);
        setSolutions(result);
        setOpenSolutionPanel(true);
      }
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

  const handleBackspace = useCallback(() => {
    setInput((prev) => prev.slice(0, prev.length - 1));
  }, []);

  const handleSubmit = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      input: { value: string };
    };
    setRythm(target.input.value);
  }, []);

  return (
    <>
      <div
        className="rounded-full w-16 h-16 bg-gray-700 flex items-center justify-center"
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
        <Dialog.Overlay className="fixed inset-0 backdrop-filter backdrop-blur" />
        <Dialog.Title className="absolute z-10 bg-surface top-0 inset-x-0 m-4 h-20 p-4 rounded-xl">
          <input
            name="input"
            type="text"
            value={input}
            onChange={handleChange}
            className="tracking-widest w-full"
          />
          <div className="flex justify-end py-2">
            Prefer
            <button className="rounded-lg ml-2 px-2 border">Flip Flop</button>
          </div>
        </Dialog.Title>
        {loading && (
          <div className="absolute z-8 top-24 inset-x-0 m-4 p-2">
            I'm Calculating...
          </div>
        )}
        {openSolutionPanel && <SolutionPanel solutions={solutions} />}
        <div className="bottom-0 absolute px-4 z-10 inset-x-0 flex flex-col items-center">
          {!openSolutionPanel && (
            <div className="flex justify-between p-2">
              <PanelButton onClick={handleBackspace}>
                ←
                <br />
                (back)
              </PanelButton>
              <PanelButton onClick={handleInputClick('_')}>
                _
                <br />
                (NoSound)
              </PanelButton>
              <PanelButton onClick={handleInputClick('X')}>
                X
                <br />
                (Sound)
              </PanelButton>
            </div>
          )}
          <div className="flex justify-center w-full p-2 border-t border-surface">
            <PanelButton onClick={() => setOpen(false)}>Close</PanelButton>
            <PanelButton
              onClick={() => {
                setInput('');
                setRythm('');
                setOpenSolutionPanel(false);
              }}
            >
              Reset
            </PanelButton>
            <PanelButton type="submit" color="main">
              gogo
            </PanelButton>
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
