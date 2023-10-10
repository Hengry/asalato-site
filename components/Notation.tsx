import React, { useMemo } from 'react';
import chunk from 'lodash-es/chunk';

const guessMeter = (length: number) => {
  const beats = length / 2;
  switch (true) {
    case beats % 4 === 0:
      return 4;
    case beats % 3 === 0:
      return 3;
    case beats % 2 === 0:
      return 2;
    default:
      return beats;
  }
};

type NotationProps = {
  values: { left: string; right: string };
  onClick?: () => void;
};
const Notation = (props: NotationProps) => {
  const { values, onClick } = props;

  const bars = useMemo(() => {
    const { left, right } = values;
    const meter = guessMeter(Math.max(left.length, right.length));
    const rows = [left, right].map((value) => chunk(chunk(value, 2), meter));
    const bars: string[][][][] = [];
    rows.forEach((row, rowIndex) => {
      row.forEach((bar, barIndex) => {
        if (!bars[barIndex]) bars[barIndex] = new Array(rows.length);
        bars[barIndex][rowIndex] = bar;
      });
    });
    return bars;
  }, [values]);

  return (
    <div onClick={onClick} className='flex p-2 tracking-widest'>
      {bars.map((bar, index) => (
        <div key={index} className='border-r first:border-l px-1'>
          {bar.map((row, index) => (
            <div key={index} className='flex'>
              {row.map((beat, index) => (
                <div key={index} className='flex px-1'>
                  {beat}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default React.memo(Notation);
