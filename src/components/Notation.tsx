import React, { useMemo } from 'react';
import chunk from 'lodash/chunk';

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
  values: string[];
  onClick?: () => void;
};
const Notation = (props: NotationProps) => {
  const { values, onClick } = props;

  const bars = useMemo(() => {
    const { length } = values[0];
    const meter = guessMeter(length);
    const rows = values.map((value) => chunk(chunk(value, 2), meter));
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
    <div onClick={onClick} className="flex p-2 tracking-widest">
      {bars.map((bar) => (
        <div className="border-r first:border-l px-1">
          {bar.map((row) => (
            <div className="flex">
              {row.map((beat) => (
                <div className="flex px-1">{beat}</div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
Notation.defaultProps = {
  startStyle: 'default',
  endStyle: 'default',
};

export default Notation;
