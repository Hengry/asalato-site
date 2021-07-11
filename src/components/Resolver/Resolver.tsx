import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import styled from '@emotion/styled';

import { findPath } from 'utils/rythm';
import PanelButton from 'components/PanelButton';
import { Solution } from 'interfaces/data';
import ResolverWorker from 'utils/resolver.worker';
import Asalato from 'components/icons/Asalato';

import InputDirection from './InputDirection';
import SolutionPanel from './SolutionPanel';
import { useRef } from 'react';

interface ResolverProps {
  rythm?: string;
}

const Resolver = (props: ResolverProps) => {
  const { rythm: propsRythm } = props;
  const [rythm, setRythm] = useState(propsRythm);
  const [open, setOpen] = useState<boolean>(true);
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [resolverStatus, setResolverStatus] = useState<
    'input' | 'loading' | 'result'
  >('input');
  const [input, setInput] = useState('');
  const [preference, setPreference] = useState('Flip Flop');
  const activeWorker = useRef<Worker | null>(null);

  useEffect(() => {
    if (rythm) {
      setOpen(true);
      setResolverStatus('loading');

      if (window.Worker) {
        const worker = new ResolverWorker();
        activeWorker.current = worker;
        worker.onmessage = (msg: MessageEvent) => {
          setResolverStatus('result');
          setSolutions(msg.data);
        };

        worker.postMessage({
          rythm,
          options: { preferGrab: preference === 'Grab' },
        });
      } else {
        const result = findPath(rythm);
        setSolutions(result);
        setResolverStatus('result');
      }
    }
  }, [rythm, preference]);

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

  const handleReset = useCallback(() => {
    activeWorker?.current?.terminate();
    setInput('');
    setRythm('');
    setResolverStatus('input');
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
        className="rounded-full w-20 h-20 bg-gray-700 flex items-center justify-center"
        onClick={handleClicked}
      >
        <Asalato />
      </div>
      <Transition show={open} appear>
        <Dialog
          as="form"
          autoComplete="off"
          onSubmit={handleSubmit}
          onClose={() => {
            setOpen(false);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="transition ease-out duration-300 transform"
            enterFrom="-translate-y-full"
            enterTo="translate-y-0"
            leave="transition ease-in duration-300 transform"
            leaveFrom="translate-y-0"
            leaveTo="-translate-y-full"
          >
            <div className="fixed z-10 top-0 inset-x-0 bottom-32 flex flex-col border-b border-surface bg-background bg-opacity-80 backdrop-filter backdrop-blur">
              <div className="bg-surface mx-4 mt-4 h-20 p-4 rounded-xl">
                <div className="flex">
                  {
                    <input
                      name="input"
                      type="text"
                      value={input}
                      onChange={handleChange}
                      className="tracking-widest flex-1"
                      disabled={resolverStatus === 'loading'}
                    />
                  }
                </div>
                <div className="flex justify-end py-2">
                  Prefer
                  <button
                    type="button"
                    className="rounded-lg ml-2 px-2 border"
                    onClick={() => {
                      setPreference((prev) =>
                        prev === 'Flip Flop' ? 'Grab' : 'Flip Flop'
                      );
                    }}
                  >
                    {preference}
                  </button>
                </div>
              </div>
              {resolverStatus === 'input' && (
                <div className="flex-1 flex justify-center items-end w-full relative p-2">
                  <InputDirection />
                  <PanelButton onClick={handleBackspace}>←</PanelButton>
                  <PanelButton onClick={handleInputClick('_')}>_</PanelButton>
                  <PanelButton onClick={handleInputClick('X')}>X</PanelButton>
                </div>
              )}
              {resolverStatus === 'loading' && (
                <div className="flex-1 m-4 p-2">I'm Calculating...</div>
              )}
              {resolverStatus === 'result' && (
                <SolutionPanel solutions={solutions} />
              )}
            </div>
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-out duration-300 transform"
            enterFrom="translate-y-full"
            enterTo="translate-y-0"
            leave="transition ease-in duration-300 transform"
            leaveFrom="translate-y-0"
            leaveTo="translate-y-full"
          >
            <div className="absolute bottom-0 flex justify-center w-full p-2 border-t border-surface bg-background bg-opacity-80 backdrop-filter backdrop-blur">
              <PanelButton onClick={() => setOpen(false)}>Close</PanelButton>
              <PanelButton onClick={handleReset}>Reset</PanelButton>
              <PanelButton type="submit" color="main">
                gogo
              </PanelButton>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};
Resolver.defaultProps = {
  rythm: '',
};

export default Resolver;
