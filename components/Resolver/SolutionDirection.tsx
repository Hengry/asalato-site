import React, { useState } from 'react';

import QuestionMarkCircleIcon from '@/components/icons/QuestionMarkCircleIcon';
import XIcon from '@/components/icons/XIcon';
import Tag from '@/components/Tag';

const filterOptions: { [cat: string]: { [name: string]: string } } = {
  'start direction': {
    forward: 'both hands start forward',
    backward: 'both hands start backward',
    twoWay: 'one hand start forward and another backward',
  },
  cycle: {
    symmetry: 'two hands respectively repeat in the same technique',
    antisymmetry: 'two hands switch tch in each cycle',
  },
  technique: {
    click: 'the solution including click',
    airTurn: 'the solution including air turn',
  },
};

const symbols: { [symbol: string]: string } = {
  F: 'Flip Flop',
  G: 'Grab',
  S: 'Shoot',
  C: 'Click (keep in the hand)',
  _: 'Heli or Shake',
  A: 'Air Turn',
};

const SolutionDirection = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type='button'
        className='absolute right-0 top-0 z-10 my-4 h-8'
        onClick={() => {
          setOpen(true);
        }}
      >
        <QuestionMarkCircleIcon />
      </button>
      {open && (
        <div
          className='fixed inset-0 z-20 h-screen bg-opacity-90 bg-background text-base text-left overflow-auto'
          onClick={() => {
            setOpen(false);
          }}
        >
          <div className='fixed right-2 top-2 text-gray-500'>
            <XIcon />
          </div>
          <div className='m-2'>About Tags</div>
          {Object.keys(filterOptions).map((cat) => (
            <div key={cat} className='mb-4'>
              <div className='text-center'>{cat}</div>
              <div className='text-sm'>
                {Object.keys(filterOptions[cat]).map((name) => (
                  <div key={name} className='flex items-center m-1'>
                    <Tag>{name}</Tag>
                    <div className='flex-1 ml-1'>
                      {name}, {filterOptions[cat][name]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className='ml-2 mt-4'>About Solution/Technique Symbol:</div>
          {Object.keys(symbols).map((symbol) => (
            <div key={symbol} className='ml-2'>
              {symbol}: {symbols[symbol]}
            </div>
          ))}
          <div className='m-2'>
            <a
              href='https://www.youtube.com/playlist?list=PL_xAdxzGkL7UIp961ZYr_VZ7997wN02Vf'
              target='_blank'
            >
              click here
            </a>{' '}
            for video tutorial
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(SolutionDirection);
